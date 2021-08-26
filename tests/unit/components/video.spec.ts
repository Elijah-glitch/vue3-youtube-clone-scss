import { mount } from "@vue/test-utils";
import Video from "@/components/Video/Video.vue";

describe("Video.vue", () => {
  it("default/large view", async () => {
    const wrapper = mount(Video);
    let defaultWidth = wrapper.find(".video-container").element.clientWidth;
    await wrapper.vm.toggleViewMode();
    expect(wrapper.find(".video-container").element.clientWidth > defaultWidth);

    await wrapper.vm.toggleViewMode();
    expect(
      wrapper.find(".video-container").element.clientWidth === defaultWidth
    );
  });

  it("settings menu toggle", async () => {
    const wrapper = mount(Video);
    await wrapper.vm.onSettingsToggle(true);
    expect(wrapper.find(".card-options-item").attributes().style).not.toContain(
      "display: none"
    );

    await wrapper.vm.onSettingsToggle(false);
    expect(wrapper.find(".card-options-item").attributes().style).toContain(
      "display: none"
    );
  });

  it("change video speed in settings menu", async () => {
    const wrapper = mount(Video);
    await wrapper.vm.setVideoSpeed(2);
    expect(wrapper.find("video").element.playbackRate).toBe(2);
    await wrapper.vm.setVideoSpeed(1);
    expect(wrapper.find("video").element.playbackRate).toBe(1);
  });

  it("toggle volume mute", async () => {
    const wrapper = mount(Video);
    await wrapper.vm.onToggleMute();
    expect(wrapper.find("video").element.volume).toBe(0);
    await wrapper.vm.onToggleMute();
    expect(wrapper.find("video").element.volume > 0);
  });

  it("change volume", async () => {
    const wrapper = mount(Video);
    await wrapper.vm.setVolumeInputValue(35);
    await wrapper.vm.setVolumeLevel();
    expect(wrapper.find("video").element.volume).toBe(35 / 100);
  });
});
