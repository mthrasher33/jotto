/**
 *
 * @param {*} wrapper
 * @param {*} val
 * @returns
 */

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
