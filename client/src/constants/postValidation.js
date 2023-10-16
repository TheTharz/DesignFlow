const postValidation = (post) => {
  const errors = {};
  if (!post.title) {
    errors.title = 'Title is required';
  }
  if (!post.description) {
    errors.description = 'Description is required';
  }
  if (!post.category) {
    errors.category = 'Please select a category';
  }
  if (!post.postImage) {
    errors.postImage = 'Please select an image';
  }
  return errors;
};
export default postValidation;
