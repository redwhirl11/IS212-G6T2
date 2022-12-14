import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrEditDeletedRole from "../hrEditDeletedRole.vue";

// If user submit did not change status from inactive to active after pressing submit
// Error message: You have not changed your status to active.
describe("hrEditDeletedRole", () => {
  it("Did Not Change Role Status to Active", () => {
    const wrapper = mount(hrEditDeletedRole,{
      propsData: {
        currentinput:[{LJRole_ID: '8', LJRole_Name: 'CTO', LJRole_Description: '', Department: 'Chairman', Key_Task: '', LJRole_Status:'Inactive'}],
        //if role is still inactive
        role_status: false,
        currentinput_status: false
        
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('You have not changed your status to active.');
  });
});

// For happy path, hr change role status to active
describe("hrEditDeletedRole", () => {
  it("Change Role Status to Active", () => {
    const wrapper = mount(hrEditDeletedRole,{
      propsData: {
        currentinput:[{LJRole_ID: '8', LJRole_Name: 'CTO', LJRole_Description: '', Department: 'Chairman', Key_Task: '', LJRole_Status:'Inactive'}],
        //if role is still active
        role_status: true,
        currentinput_status: false
        
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('');
  
  });
});



