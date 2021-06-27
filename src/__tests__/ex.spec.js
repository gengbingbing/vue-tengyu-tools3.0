// ex.spec.js
import { shallowMount } from '@vue/test-utils';
import index from '@/views/appHead/AppHead.vue';

// eslint-disable-next-line no-undef
describe('index.vue', () => {
  // eslint-disable-next-line no-undef
  it('renders text', () => {
    const msg = '管理员';
    const wrapper = shallowMount(index);
    // eslint-disable-next-line no-undef
    expect(wrapper.text()).toContain(msg);
  });
});
