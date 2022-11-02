import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrCreateSkill from "../hrCreateSkill.vue";

//Course_assign is null
describe("hrCreateSkill", () => {
  it("renders properly", () => {
    const wrapper = mount(hrCreateSkill,{
      propsData: {
        Course_assign:'',
      }   
    })
    //result from the function
    wrapper.vm.getErrorMessage()
    
    //expected result
    expect(wrapper.vm.errorm).toBe('You must assign a course(s) to the skill');
  
  });
});

//skill name is null
describe("hrCreateSkill", () => {
    it("renders properly", () => {
      const wrapper = mount(hrCreateSkill,{
        propsData: {
            Skill_Name:'',
        }   
      })
            
      //result from the function
      wrapper.vm.getErrorMessage()
      
      //expected result
      expect(wrapper.vm.errorm).toBe('Invalid Skill Name');
    
    });
  });
