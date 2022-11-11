import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LJrole from "../LJrole.vue";

describe("LJrole", () => {
  it("Able to find role in the database", () => {
    const wrapper = mount(LJrole,{
        propsData: {
        search_data:'CEO', 
        check_html: false,
        in_DB: true
        }
    })
        wrapper.vm.getErrorMessage()         
        expect(wrapper.vm.errorm).toBe('');

          
  });
});

describe("LJrole", () => {
  it("Cannot find the role in the database", () => {
    const wrapper = mount(LJrole,{
        propsData: {
        search_data:'CTO', 
        check_html: false,
        in_DB: false
        }
    })
        wrapper.vm.getErrorMessage()         
        expect(wrapper.vm.errorm).toBe("Sorry... No record found! :(");

          
  });
});
