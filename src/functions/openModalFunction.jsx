// open a modal by its ID
export function openModalFunction() {
  return (id) => {
    document.getElementById(id).showModal();
  };
}