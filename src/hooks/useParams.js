const useParams = (params) => {
  const serialize = (params) => {
    const str = [];
    Object.entries(params).forEach(([key, val]) => {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    });
    return str.join('&');
  };

  const removeOffset = (params) => {
    const str = [];
    Object.entries(params).forEach(([key, val]) => {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    });
    str.pop();
    return str.join('&');
    return str;
  };
  return {url: serialize(params), urlNoOffset: removeOffset(params)};
};

export default useParams;
