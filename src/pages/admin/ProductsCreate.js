import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import useForm from '../../hooks/useForm';
import AdminSpinner from '../../components/AdminSpinner';
import axios from 'axios';
import {Dropzone, FileItem, FullScreenPreview} from 'dropzone-ui';
import Select from 'react-select';
import useCategories from '../../hooks/useCategories';
import useProducts from '../../hooks/useProducts';
import {useFormik} from 'formik';

const ProductsCreate = () => {
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [files, setFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const {index, getPropertyTypes, createCategory} = useCategories();
  const {create} = useProducts();
  const [properties, setProperties] = React.useState([]);
  const [propertiesValues, setPropertiesValues] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(
      {value: 0, label: ''},
  );

  React.useEffect(() => {
    index().then((res) => setCategories(res.data));
  }, []);

  React.useEffect(() => {
    if (selectedCategory.label.length > 1) {
      getPropertyTypes(selectedCategory.label.toLowerCase().replace(/\s/g, '_'))
          .then((res) => setProperties(res.data.properties));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setPropertiesValues({});
    setSelectedCategory(category);
  };

  const handlePropertiesChange = (property) => {
    const newArr = {...propertiesValues};
    newArr[property.property_id] = property;
    setPropertiesValues(newArr);
  };

  console.log(propertiesValues);

  const fform = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('product[title]', values.name);
      formData.append('product[category_id]', selectedCategory.value);
      Object.entries(propertiesValues).forEach(([k, v]) => {
        formData.append(
            'product[product_properties_ids][]',
            v.product_property_id,
        );
      });
      files.forEach((item) => formData.append('product[images][]', item.file));
      console.log('asdasd');
      create(formData)
          .then(() => setSubmitStatus('success'))
          .catch(() => setSubmitStatus('error'));
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Campo requerido';
      }
      return errors;
    },
  });

  console.log(fform);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  const categoriesArray = categories.map((item) =>
    ({value: item.id, label: item.name}),
  );


  const imagesArray = (files) => {
    const images = files.map((item) =>
      item.file,
    );
    return images;
  };

  return (
    <>
      {isLoading && <AdminSpinner />}
      <ContentHeader title="Crear producto"/>
      <div className="admin-content-wrapper">
        {submitStatus === 'success' &&
        <div
          className="alert alert-success"
        >
          Producto creado correctamente
        </div> }
        {submitStatus === 'error' &&
          <div
            className="alert alert-warning"
          >
          El producto no pudo ser creado intentelo mas tarde
          </div>
        }
        <fieldset>
          <form onSubmit={fform.handleSubmit}>
            <label
              className="form-label"
              htmlFor="name"
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
              onChange={fform.handleChange}
              id="name"
              type="text"
              name="name"
              value={fform.values.name}
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
            <label htmlFor="categories">Categoria</label>
            <div style={{margin: '5px 0'}}>
              <Select
                isSearchable={true}
                onChange={handleCategoryChange}
                options={categoriesArray}
                placeholder='Categorias'
              />
            </div>
            <div>
              {properties && properties.map((item, index) =>
                <div key={item.id} className='ms-5'>
                  <label
                    className='form-label'
                    htmlFor={item.property_name}
                  >
                    {item.property_name}
                  </label>
                  <Select
                    name='property'
                    onChange={handlePropertiesChange}
                    options={item.property_values}
                  />
                </div>,
              )}
            </div>
            <Dropzone
              style={{minWidth: '550px', margin: '20px 0'}}
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
                  key={file}
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
              value="Crear"
            />
          </form>
        </fieldset>
      </div>
    </>
  );
};

export default ProductsCreate;
