import React from 'react';
import {useParams} from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import useVariants from '../../hooks/useVariants';
import AdminSpinner from '../../components/AdminSpinner';
import ProductMenu from '../../components/ProductMenu';
import {Link} from 'react-router-dom';
import {
  faEdit,
  faTrash,
  faTrashRestore,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const VariantsIndex = () => {
  const [variants, setVariants] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const {index, remove, restore} = useVariants();
  const {productId} = useParams();

  React.useEffect(() => {
    getVariants();
  }, []);

  const getVariants = () => {
    setIsLoading(true);
    index(productId)
        .then((res) => {
          setVariants(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
  };

  const handleRestore = (id) => {
    restore(id)
        .then(() => getVariants());
  };

  const handleRemove = (id) => {
    console.log(id);
    remove(id)
        .then(() => getVariants());
  };

  console.log(variants);

  const renderVariants = variants.map((variant) =>
    <tr key={variant.id}>
      <td>{variant.id}</td>
      <td>{variant.size}</td>
      <td>{variant.stock}</td>
      <td>{variant.price}</td>
      <td>
        <Link
          to={
            `/admin/products/${variant.product_id}/variants/${variant.id}/edit`
          }>
          <FontAwesomeIcon icon={faEdit}/>
        </Link>
        {variant.discarded_at ?
          <span
            style={{cursor: 'pointer'}}
            onClick={() => handleRestore(variant.id)}
          >
            <FontAwesomeIcon icon={faTrashRestore} />
          </span> :
            <span
              style={{cursor: 'pointer'}}
              onClick={() => handleRemove(variant.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
        }
      </td>
    </tr>,
  );

  return (
    <>
      {isLoading && <AdminSpinner />}
      <ContentHeader
        title="Variantes"
        btn={`/admin/products/${productId}/variants/new`}
        btnVal="Crear variante"
      />
      <div className="admin-content-wrapper">
        <ProductMenu variant={'variants'} productId={productId} />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Talla</th>
              <th>Stock</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderVariants}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VariantsIndex;
