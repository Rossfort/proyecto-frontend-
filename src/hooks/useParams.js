const useParams = (params, scope = null) => {
  const serialize = (params) => {
    const str = [];
    Object.entries(params).forEach(([key, val]) => {
      if (val.length > 1) {
        val.forEach((item) => {
          str.push( `${scope ? `${scope}[${encodeURIComponent(key)}][]` : encodeURIComponent(key)}=${encodeURIComponent(item)}`);
        });
      } else {
        str.push( `${scope ? `${scope}[${encodeURIComponent(key)}][]` : encodeURIComponent(key)}=${encodeURIComponent(val)}`);
      }
    });
    return str.join('&');
  };

  const removeOffset = (params) => {
    const str = [];
    Object.entries(params).forEach(([key, val]) => {
      str.push( `${scope ? `${scope}[${encodeURIComponent(key)}][]` : encodeURIComponent(key)}=${encodeURIComponent(val)}`);
    });
    str.pop();
    return str.join('&');
    return str;
  };
  return {url: serialize(params), urlNoOffset: removeOffset(params)};
};

export default useParams;
