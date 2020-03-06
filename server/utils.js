function buildPaging({ resultsPerPage, currentPage, sort }) {
  const limit = resultsPerPage;
  const offset = resultsPerPage * currentPage;

  let orderBy = sort.field;
  // We need to add a "-" before the sorting field to set the descending order
  if (sort.order === 'DESC') {
    orderBy = `-${orderBy}`;
  }

  return {
    limit,
    offset,
    orderBy,
  };
}

module.exports = {
  buildPaging,
};
