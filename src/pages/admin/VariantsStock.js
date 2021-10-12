import React from 'react';
import AdminSpinner from '../../components/AdminSpinner';
import useVariants from '../../hooks/useVariants';
import ProductMenu from '../../components/ProductMenu';
import ContentHeader from '../../components/ContentHeader';
import {useParams} from 'react-router-dom';
import useForm from '../../hooks/useForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const VariantsStock = () => {
  const [variants, setVariants] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const {id} = useParams();
  const {index} = useVariants();
  const {values, handleChange} = useForm({});
  const {editPatch} = useVariants();
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    getVariants();
  }, []);

  const handleChangeStock = (e, variantId) => {
    e.preventDefault();
    setIsLoading(true);
    editPatch(variantId, {stock: values[variantId]})
        .then((res) => {
          getVariants();
          setSuccess(true);
          setIsLoading(false);
        })
        .catch((res) => {
          setError(true);
          setIsLoading(false);
        });
  };

  const getVariants = () => {
    setIsLoading(true);
    index(id)
        .then((res) => {
          setVariants(res.data);
          setIsLoading(false);
        });
  };

  console.log(values);
  return (
    <>
      {isLoading && <AdminSpinner />}
      <ContentHeader
        title="Stock"
      />
      <div className="admin-content-wrapper">
        {error &&
        <div className="alert alert-danger">
          Hubo un error al intentar actualizar el stock.
        </div>
        }
        {success &&
        <div className="alert alert-success">
          Stock actualizado correctamente.
        </div>
        }
        <ProductMenu stock="stock" productId={id} />
        <table className="table">
          <thead>
            <tr>
              <th>Variante</th>
              <th>Stock</th>
              <th>Modificar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {variants.map((item) =>
              <tr key={item.id}>
                <td>{item.size}</td>
                <td>{item.stock}</td>
                <td>
                  <form
                    id={item.id}
                    onSubmit={(e) => handleChangeStock(e, item.id)}
                  >
                    <input
                      id={item.id}
                      name={item.id}
                      onChange={handleChange}
                      min={0}
                      type="number"
                    />
                  </form>
                </td>
                <td>
                  <button type="submit" form={item.id}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </td>
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VariantsStock;
