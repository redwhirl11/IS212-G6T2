import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import hrEditDeletedSkill from "../hrEditDeletedSkill.vue";

// describe("hrCreateRole", () => {
//   it("renders properly", () => {
//     const wrapper = mount(hrCreateRole,{
//       propsData: {
//         Department: 'ceo',
//         RoleName:'',
//         skills_required:'00007',
//         // error: 'Invalid Role Name'
//       }
    
//     })
//     // const byId = wrapper.find('#submitBTN')
//     // //CLICK id submitBTN
//     // expect(byId.element.id).toBe('submitBTN')    
//     //can call for data(parameter)
//     wrapper.vm.getErrorMessage()
//     expect(wrapper.vm.errorm).toBe('Invalid Role Name');
  
//   });
// });

describe("hrEditDeletedSkill", () => {
    it("Did Not Change Skill Status to Active", () => {
      const wrapper = mount(hrEditDeletedSkill,{
        propsData: {
          //if skill is still inactive
          skill_status: false
          
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
          //if skill is still active
          skill_status: true
          
        }   
      })   
      //result from the function
      wrapper.vm.getErrorMessage()    
      //expected result
      expect(wrapper.vm.errorm).toBe('');
    
    });
  });
