export const listFormatPolyfill = (arr) =>
  Intl.ListFormat
    ? new Intl.ListFormat().format(arr)
    : arr.join(', ').replace(/,\s([^,]+)$/, ' and $1');

export const twoLevelsUniqFlatMap = (arr, field1, field2, defaultValue) =>
  Array.from(
    new Set(arr.flatMap((obj) => obj[field1][field2] || defaultValue)),
  );

export const toggleRepoDetailsVisibleEx = (setRepoDetailsVisible) => (
  repoId,
  isVisible,
) => {
  setRepoDetailsVisible((oldRepoDetailsVisible) => {
    const newRepoDetailsVisible = {
      ...oldRepoDetailsVisible,
    };
    newRepoDetailsVisible[repoId] = isVisible;
    return newRepoDetailsVisible;
  });
};
