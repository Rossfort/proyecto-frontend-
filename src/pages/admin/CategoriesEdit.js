import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';
import {Link, useLocation, useHistory} from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import {Dropzone, FileItem, FullScreenPreview} from 'dropzone-ui';
import useUrlToFile from '../../hooks/useUrlToFile';
import {useFormik} from 'formik';

const CategoriesEdit = () => {
  const [category, setCategory] = React.useState([]);
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [loading, setLoading] = React.useState(false);
  const {id} = useParams();
  const {adminEdit, updateCategory} = useCategories();
  const [files, setFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);

  React.useEffect(() => {
    adminEdit(id).then((res) => {
      setCategory(res.data.category);
      if (res.data.image.encoded_image) {
        const file = useUrlToFile(
            res.data.image.encoded_image, res.data.image.filename,
        );
        setFiles([{errors: [], file: file, valid: true}]);
      }
    });
  }, []);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  const fform = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: category.name,
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('category[name]', values.name);
      formData.append('category[image]', files[0].file);
      updateCategory(id, formData)
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

  return (
    <>
      <ContentHeader
        title={'Categorias'}
        btn='/admin/categories/new'
        btnVal='Crear Categoria'
      />
      <div className="admin-content-wrapper">
        <form onSubmit={fform.handleSubmit}>
          <label
            htmlFor="name"
            className='form-label'
          >
          Nombre
          </label>
          <input
            type="text"
            name='name'
            id='name'
            onChange={fform.handleChange}
            value={fform.values.name}
            className='form-control mb-4'
          />
          <Dropzone
            view={'list'}
            onChange={updateFiles}
            value={files}
            maxFiles={1}
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
          <input type="submit" className='btn btn-primary mt-4' />
        </form>
      </div>
    </>
  );
};

export default CategoriesEdit;
