import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import Spinner from 'react-bootstrap/Spinner';
import useCategories from '../../hooks/useCategories';
import {Dropzone, FileItem, FullScreenPreview} from 'dropzone-ui';
import {useFormik} from 'formik';

const CategoriesNew = () => {
  const [loading, setLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [files, setFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const {createCategory} = useCategories();

  console.log(imageSrc);

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
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('category[name]', values.name);
      formData.append('category[image]', files[0].file);
      createCategory(formData)
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
      />
      <div className="admin-content-wrapper">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-8">
            <form onSubmit={fform.handleSubmit}>
              <label
                htmlFor="name"
                className='form-label'
              >
            Nombre de la categoria.
              </label>
              <input
                type="text"
                name='name'
                id='name'
                onChange={fform.handleChange}
                value={fform.values.name}
                className='form-control mb-4'
              />
              {fform.errors.name && <div
                className='text-danger'>{fform.errors.name}</div>}
              <Dropzone
                style={{minWidth: '550px'}}
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
              <input type="submit" className='btn btn-primary mx-auto mt-4'/>
            </form>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesNew;
