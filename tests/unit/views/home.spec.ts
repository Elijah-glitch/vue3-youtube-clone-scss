import { mount } from "@vue/test-utils";
import Home from "@/views/Home/Home.vue";

describe("Home.vue", () => {
  it("video options open", async () => {
    const wrapper = mount(Home);
    await wrapper.find(".options-button").trigger("click");
    expect(wrapper.vm.videoOptionsValues[0].visible).toBe(true);
  });
});
