export function closeModalFunction() {
  return (id) => {
    document.getElementById(id).close();
  };
}