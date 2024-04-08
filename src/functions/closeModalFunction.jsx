// close a modal by its ID
export function closeModalFunction() {
  return (id) => {
    document.getElementById(id).close();
  };
}