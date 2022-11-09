import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LJrole from "../LJrole.vue";

describe("LJrole", () => {
  it("renders properly", () => {
    const wrapper = mount(LJrole,{
    })
    wrapper.vm.getErrorMessage()
    expect(wrapper.vm.errorm).toBe('');
  
  });
});
