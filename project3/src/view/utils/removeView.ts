export const removeCurrentView = (
  current_container: HTMLDivElement,
  next_container: HTMLDivElement,
) => {
  current_container.innerHTML = '';
  current_container.classList.add('hidden');
  next_container.classList.remove('hidden');
};
