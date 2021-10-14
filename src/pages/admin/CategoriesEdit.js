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
  const [properties, setProperties] = React.useState([]);
  const [initialFormValues, setInitialFormValues] = React.useState({});

  React.useEffect(() => {
    adminEdit(id).then((res) => {
      setCategory(res.data.category);
      setProperties(res.data.category.properties);
      setInitialFormValues({name: res.data.category.name});
      if (res.data.image.encoded_image) {
        const file = useUrlToFile(
            res.data.image.encoded_image, res.data.image.filename,
        );
        setFiles([{errors: [], file: file, valid: true}]);
      }
      initValues(res.data.category);
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

  const initValues = (category) => {
    const values = {};
    values['name'] = category.name;
    category.properties.forEach((item) =>
      values[`property-${item.id}`] = item.name,
    );
    setInitialFormValues(values);
  };

  const fform = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('category[name]', values.name);
      formData.append('category[image]', files[0].file);
      if (properties.length) {
        const props = {};
        Object.entries(fform.values).forEach(([k, v]) => {
          props[k] = {id: v.id, name: v.name};
          if (v['_destroy'] === true) props[id]['_destroy'] = true;
          if (v.new) props[id].id = '';
        });
        debugger;
      }
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

  console.log(fform.values);

  const removeProperty = (e) => {
    const values = [...properties];
    const inputIndex = properties.findIndex((item) =>
      item.id === +e.target.dataset.inputId);
    values[inputIndex]['_destroy'] = true;
    setProperties(values);
  };

  const renderProperties = properties.map((item, index) => {
    if (item['_destroy']) {
      return;
    }
    return (
      <div key={item.id} className='ms-5'>
        <label
          htmlFor={`name-${item.id}`}
          className='form-label'
        >
          Nombre
        </label>
        <div style={{width: '300px', display: 'flex'}}>
          <input
            type="text"
            className='form-control'
            id={`property-${item.id}`}
            name={`properties[${item.id}][name]`}
            value={fform.values[`property-${item.id}`]}
            onChange={fform.handleChange}
          />
        </div>
        <a href='#'
          style={{width: '40px'}}
          className='btn btn-primary'
          data-input-id={item.id}
          onClick={removeProperty}
        >
            -
        </a>
      </div>
    );
  });

  const addProperty = (e) => {
    const id = new Date().getTime();
    const values = [...properties];
    values.push({name: '', id, new: true});
    setProperties(values);
  };

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
          {renderProperties}
          <a
            href='#'
            style={{width: '40px'}}
            className='btn btn-primary'
            onClick={addProperty}
          >
            +
          </a>
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
