import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrCreateSkill from "../hrCreateSkill.vue";
import hrEditSkill from "../hrEditSkill.vue";

//Course_assign is null
describe("hrCreateSkill", () => {
  it("Null Value for Course_assign", () => {
    const wrapper = mount(hrCreateSkill,{
      propsData: {
        Skill_Name: 'Frontend Development',
        Type_of_Skill:'Technical',
        Level_of_Competencies:'Beginner',
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
        Skill_Name: 'Frontend Development',
        Type_of_Skill:'Technical',
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

// if user select inactive course
describe("hrCreateSkill", () => {
  it("Assign inactive course to  skill", () => {
    const wrapper = mount(hrCreateSkill,{
      propsData: {
        Skill_Name: 'Frontend Development',
        Type_of_Skill:'Technical',
        Level_of_Competencies:'Beginner',
        Course_assign:true,
        course_status: false,
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must select an active course');
  
  });
});

//EDIT SKILL
// Course_assign field is not empty
describe("hrEditSkill", () => {
  it("Assign 1 course to the skill", () => {
    const wrapper = mount(hrEditSkill,{
      propsData: {
        datavalue:'4',
        SkillName:'Communication',
        Type_of_Skill:'General',
        Level_of_Competencies:'Beginner',
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
describe("hrEditSkill", () => {
  it("Assign 1 course to the skill", () => {
    const wrapper = mount(hrEditSkill,{
      propsData: {
        datavalue:'4',
        SkillName:'Communication',
        Type_of_Skill:'General',
        Level_of_Competencies:'Beginner',
        Course_assign:true
        
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('');
  
  });
});

// if user select inactive course
describe("hrEditSkill", () => {
  it("Assign inactive course to the skill", () => {
    const wrapper = mount(hrEditSkill,{
      propsData: {
        datavalue:'4',
        SkillName:'Communication',
        Type_of_Skill:'General',
        Level_of_Competencies:'Beginner',
        //if hr changed the skills required
        Course_assign:true,
        //selected skill is inactive
        courses_status: false,
        
      }   
    })   
    //result from the function
    wrapper.vm.getErrorMessage()    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must select an active course');
  
  });
});
