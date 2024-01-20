export function openModalFunction() {
  return (id) => {
    document.getElementById(id).showModal();
  };
}