import React from 'react';
import {useParams} from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import AdminSpinner from '../../components/AdminSpinner';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import ProductMenu from '../../components/ProductMenu';
import {Dropzone, FileItem, FullScreenPreview} from 'dropzone-ui';
import useUrlToFile from '../../hooks/useUrlToFile';

const ProductsEdit = () => {
  const {handleChange, values, setValues} = useForm({
    title: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [image, setImage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const {edit, editPatch} = useProducts();
  const [files, setFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);


  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  const {id} = useParams();
  React.useEffect(() => {
    getProduct();
  }, [id]);

  console.log(files);

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    files.forEach((image) => {
      formData.append('product[images][]', image.file);
    });
    formData.append('product[title]', values.title);
    editPatch(id, formData)
        .then(() => {
          setSubmitStatus('success');
          setIsLoading(false);
        })
        .catch(() => {
          setSubmitStatus('error');
          setIsLoading(false);
        });
  };

  const getProduct = () => {
    setIsLoading(true);
    edit(id)
        .then((res) => {
          getImages(res.data.images);
          setValues({title: res.data.product.title});
          setImage(res.data.image);
          setIsLoading(false);
        });
  };

  const getImages = (images) => {
    const decodedImages = [];
    images.forEach((image, index) => {
      const a = useUrlToFile(image, `asd${index}.png`);
      decodedImages.push({errors: [], file: a, valid: true, id: index + 5});
    });
    setFiles(decodedImages);
  };

  console.log(files)

  const handleValidations = () => {
    const errors = {};

    if (!values.title) {
      errors.title = 'El titulo del producto no puede estar vacio';
    }
    setErrors(errors);
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmit();
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleForm = (e) => {
    e.preventDefault();
    handleValidations();
    setIsSubmitting(true);
  };

  return (
    <>
      {isLoading && <AdminSpinner />
      }
      <ContentHeader
        title="Editar producto"
        btn={`/admin/products/${id}/variants/new`}
        btnVal="Crear variante"
      />
      <div className="admin-content-wrapper">
        {submitStatus === 'success' &&
        <div
          className="alert alert-success"
        >
          Producto fue editado correctamente.
        </div> }
        {submitStatus === 'error' &&
          <div
            className="alert alert-warning"
          >
          El producto no pudo ser editado correctamente intentelo mas tarde.
          </div>
        }
        <ProductMenu product={'product'} productId={id} />
        <fieldset>
          <form onSubmit={handleForm}>
            <label
              className="form-label"
              htmlFor="title"
            >
              Titulo
            </label>
            {errors.title && <p
              className="alert alert-warning"
            >
              {errors.title}
            </p>}
            <input
              className="form-control"
              onChange={handleChange}
              id="title"
              type="text"
              name="title"
              value={values.title}
            />
            <label
              htmlFor="image"
            >
              Imagen
            </label>
            {errors.image && <p
              className="alert alert-warning"
            >
              {errors.image}
            </p>}
            <Dropzone
              view={'list'}
              onChange={updateFiles}
              value={files}
              maxFiles={5}
              maxFileSize={2998000}
              label="Suelta tus archivos aquí"
              accept=".png,image/*"
              uploadingMessage={'Uploading...'}
              localization={'ES-es'}
            >
              {files.map((file) => (
                <FileItem
                  key={file.file.lastModified}
                  {...file}
                  onDelete={onDelete}
                  onSee={handleSee}
                  localization={'ES-es'}
                  preview
                  info
                  hd
                />
              ))}
              <FullScreenPreview
                imgSource={imageSrc}
                openImage={imageSrc}
                onClose={(e) => handleSee(undefined)}
              />
            </Dropzone>
            <input
              className="btn btn-primary mt-2"
              type="submit"
              value="Editar"
            />
          </form>
        </fieldset>
        <div>
          <img src={image} alt="" />
        </div>
      </div>
    </>
  );
};

export default ProductsEdit;
