import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrCreateSkill from "../hrCreateSkill.vue";

//Course_assign is null
describe("hrCreateSkill", () => {
  it("Null Value for Course_assign", () => {
    const wrapper = mount(hrCreateSkill,{
      propsData: {
        Type_of_Skill:'smth',
        Course_assign:false,
      }   
    })
    //result from the function
    wrapper.vm.getErrorMessage()
    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must assign a course(s) to the skill');
  
  });
});

// Course_assign field is not empty
describe("hrCreateSkill", () => {
  it("Assign 1 course to the skill", () => {
    const wrapper = mount(hrCreateSkill,{
      propsData: {
        Skill_Name:'Communication',
        Type_of_Skill:'General',
        Level_of_Competencies:'Beginner',
        Course_assign:true,
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('');
  
  });
});