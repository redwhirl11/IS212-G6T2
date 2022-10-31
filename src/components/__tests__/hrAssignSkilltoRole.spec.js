import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrCreateRole from "../hrCreateRole.vue";

describe("hrCreateRole", () => {
  it("renders properly", () => {
    const wrapper = mount(hrCreateRole,{
      propsData: {
        skills_required:'',
      }   
    })
    
    
    //result from the function
    wrapper.vm.getErrorMessage()
    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must assign a skill(s) to the role');
  
  });
});

// const byId = wrapper.find('#submitBTN')
    // //CLICK id submitBTN
    // expect(byId.element.id).toBe('submitBTN')    
    //can call for data(parameter)
