import { mount } from "@vue/test-utils";
import Layout from "@/components/Layout/Layout.vue";

describe("Layout.vue", () => {
  it("block drawer toggle", async () => {
    const wrapper = mount(Layout);
    await wrapper.find(".sidebar-block-button").trigger("click");
    expect(wrapper.vm.showSidebarBlock).toBe(true);
  });

  it("drawer toggle", async () => {
    const wrapper = mount(Layout);
    await wrapper.find(".sidebar-drawer-button").trigger("click");
    expect(wrapper.vm.showSidebarDrawer).toBe(true);
  });

  it("small search bar toggle", async () => {
    const wrapper = mount(Layout);
    await wrapper.find(".navbar-right-search-button").trigger("click");
    expect(wrapper.vm.isSmallSearchActive).toBe(true);
    await wrapper.find(".navbar-searchSmallSizeBackButton").trigger("click");
    expect(wrapper.vm.isSmallSearchActive).toBe(false);
  });

  it("click add video button to dropdown menu open", async () => {
    const wrapper = mount(Layout);
    await wrapper.find(".navbarRight-addVideoButton").trigger("click");
    expect(wrapper.vm.dropdownVisibleValues.addVideoVisible.value).toBe(true);
  });

  it("click apps button to dropdown menu open", async () => {
    const wrapper = mount(Layout);
    await wrapper.find(".navbarRight-appsButton").trigger("click");
    expect(wrapper.vm.dropdownVisibleValues.appsVisible.value).toBe(true);
  });

  it("click notification button to dropdown menu open", async () => {
    const wrapper = mount(Layout);
    await wrapper.find(".navbarRight-notificationButton").trigger("click");
    expect(wrapper.vm.dropdownVisibleValues.notificationVisible.value).toBe(
      true
    );
  });

  it("click profile button to dropdown menu open", async () => {
    const wrapper = mount(Layout);
    await wrapper.find(".navbarRight-profileButton").trigger("click");
    expect(wrapper.vm.dropdownVisibleValues.profileVisible.value).toBe(true);
  });
});
