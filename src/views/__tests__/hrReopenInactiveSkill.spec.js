import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrEditDeletedSkill from "../hrEditDeletedSkill.vue";

describe("hrEditDeletedSkill", () => {
    it("Did Not Change Skill Status to Active", () => {
      const wrapper = mount(hrEditDeletedSkill,{
        propsData: {
          currentinput:[{Skill_ID: '6', Skill_Name: 'Finance', Type_of_Skills: 'Technical', Level_of_Competencies: 'Beginner', Skill_Status: 'Inactive'}],
          //if skill is still inactive
          skill_status: false,
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
  describe("hrEditDeletedSkill", () => {
    it("Change Role Status to Active", () => {
      const wrapper = mount(hrEditDeletedSkill,{
        propsData: {
          currentinput:[{Skill_ID: '6', Skill_Name: 'Finance', Type_of_Skills: 'Technical', Level_of_Competencies: 'Beginner', Skill_Status: 'Inactive'}],
          //if skill is still active
          skill_status: true,
          currentinput_status: false
          
        }   
      })   
      //result from the function
      wrapper.vm.getErrorMessage()    
      //expected result
      expect(wrapper.vm.errorm).toBe('');
    
    });
  });
