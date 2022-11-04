import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrCreateRole from "../hrCreateRole.vue";

// Null Value for skills_required
describe("hrCreateRole", () => {
  it("Null Value for skills_required", () => {
    const wrapper = mount(hrCreateRole,{
      propsData: {
        RoleName:'CEO',
        skills_required: false,
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must assign a skill(s) to the role');
  
  });
});

// skills_required field is not empty
describe("hrCreateRole", () => {
  it("Assign 1 skill to the role", () => {
    const wrapper = mount(hrCreateRole,{
      propsData: {
        RoleName:'CEO',
        skills_required:true,
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('');
  
  });
});

// const byId = wrapper.find('#submitBTN')
    // //CLICK id submitBTN
    // expect(byId.element.id).toBe('submitBTN')    
    //can call for data(parameter)
