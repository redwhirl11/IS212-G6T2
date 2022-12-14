import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrCreateRole from "../hrCreateRole.vue";
import hrEditRole from "../hrEditRole.vue";

//CREATE ROLE
// Null Value for skills_required
describe("hrCreateRole", () => {
  it("Null Value for skills_required", () => {
    const wrapper = mount(hrCreateRole,{
      propsData: {
        RoleName:'CEO',
        Department: 'CEO',
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
  it("Assign at least 1 skill to the role", () => {
    const wrapper = mount(hrCreateRole,{
      propsData: {
        RoleName:'CEO',
        Department: 'CEO',
        skills_required:true,
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('');
  
  });
});

// if user select inactive skill
describe("hrCreateRole", () => {
  it("Assign inactive skill to the role", () => {
    const wrapper = mount(hrCreateRole,{
      propsData: {
        RoleName:'CEO',
        Department: 'CEO',
        skills_required:true,
        skills_status: false
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must select an active skill');
  
  });
});

//EDIT ROLE
// Null Value for skills_required
describe("hrEditRole", () => {
  it("Null Value for skills_required", () => {
    const wrapper = mount(hrEditRole,{
      propsData: {
        RoleName:'CEO',
        department:'CEO',
        //current role id is 6
        datavalue: '6',
        //if hr deleted the current skill (empty skills required)
        skills_required: false
        
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must assign a skill(s) to the role');
  
  });
});

// skills_required field is not empty
describe("hrEditRole", () => {
  it("Assign at least 1 skill to the role", () => {
    const wrapper = mount(hrEditRole,{
      propsData: {
        RoleName:'CEO',
        department:'CEO',
        datavalue: '6',
        //if hr changed the skills required
        skills_required:true
        
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('');
  
  });
});

// if user select inactive skill
describe("hrEditRole", () => {
  it("Assign inactive skill to the role", () => {
    const wrapper = mount(hrEditRole,{
      propsData: {
        RoleName:'CEO',
        department:'CEO',
        datavalue: '6',
        //if hr changed the skills required
        skills_required:true,
        //selected skill is inactive
        skills_status: false,
        
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must select an active skill');
  
  });
});

