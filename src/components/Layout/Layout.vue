<template>
  <div
    class="layout"
    :class="{
      'layout-hide-scrollbar': hideLayoutScrollBar,
    }"
  >
    <div class="navbar" v-show="showNavbar">
      <div
        class="navbar-searchSmallSize"
        :active="isSmallSearchActive ? 'active' : 'deactive'"
      >
        <detail-popup-container>
          <transparent-button
            class="navbar-searchSmallSizeBackButton"
            :rippleEffect="true"
            :padding="`7px 8px 7px 4px`"
            :margin="`0 0 0 10px`"
            @click="fullWidthSearchVisibleToggle()"
          >
            <icon-base class="icon"><icon-back-line-arrow /></icon-base>
          </transparent-button>
          <detail-popup-item :left="'4px'">Back</detail-popup-item>
        </detail-popup-container>
        <search-bar class="navbar-searchSmallSizeSearchBar" />
      </div>
      <div class="navbar-left">
        <transparent-button
          class="sidebar-block-button"
          :rippleEffect="true"
          :padding="`7px 8px 7px 4px`"
          :class="{ 'sidebar-block-active': sidebarBlock }"
          :sidebarActive="sidebarBlock ? 'true' : 'false'"
          @click="showBlockSidebarToggle()"
        >
          <icon-base class="icon"><icon-bar /></icon-base>
        </transparent-button>
        <transparent-button
          class="sidebar-drawer-button"
          :rippleEffect="true"
          :padding="`7px 8px 7px 4px`"
          @click="showDrawerSidebarToggle()"
        >
          <icon-base class="icon"><icon-bar /></icon-base>
        </transparent-button>
        <transparent-button :padding="`16px 14px 16px 16px`">
          <main-logo />
        </transparent-button>
      </div>
      <div class="navbar-middle">
        <search-bar class="searchBar" />
      </div>
      <div class="navbar-right">
        <detail-popup-container>
          <transparent-button
            :rippleEffect="true"
            :padding="`8px`"
            :margin="`0 8px 0 0`"
            @click="fullWidthSearchVisibleToggle()"
            class="navbar-right-search-button"
          >
            <icon-base class="icon"><icon-search /></icon-base>
          </transparent-button>
          <detail-popup-item :left="'-8px'"> Search </detail-popup-item>
        </detail-popup-container>
        <dropdown-container>
          <detail-popup-container>
            <transparent-button
              :rippleEffect="true"
              :padding="`8px`"
              :margin="`0 8px 0 0`"
              @click="changeDropdownValue('addVideoVisible', true)"
              class="navbarRight-addVideoButton"
            >
              <icon-base class="icon"><icon-add-video /></icon-base>
            </transparent-button>
            <detail-popup-item :left="'-8px'"> Create </detail-popup-item>
          </detail-popup-container>
          <dropdown-item
            :visible="dropdownVisibleValues.addVideoVisible.value"
            :direction="'right'"
            class="dropdown-item-links"
            :onclose="() => changeDropdownValue('addVideoVisible', false)"
          >
            <dropdown-link-main margin-top>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-tv />
              </icon-base>
              <span class="dropdown-link-main-text"> Upload video </span>
            </dropdown-link-main>
            <dropdown-link-main margin-bottom>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-tv />
              </icon-base>
              <span class="dropdown-link-main-text"> Go live </span>
            </dropdown-link-main>
          </dropdown-item>
        </dropdown-container>
        <dropdown-container>
          <detail-popup-container>
            <transparent-button
              :rippleEffect="true"
              :padding="`8px`"
              :margin="`0 8px 0 0`"
              @click="changeDropdownValue('appsVisible', true)"
              class="navbarRight-appsButton"
            >
              <icon-base class="icon"><icon-apps /></icon-base>
            </transparent-button>
            <detail-popup-item
              :left="'-60%'"
              :vDirection="'bottom'"
              :hDirection="'middle'"
            >
              YouTube apps
            </detail-popup-item>
          </detail-popup-container>
          <dropdown-item
            :visible="dropdownVisibleValues.appsVisible.value"
            :direction="'left'"
            class="dropdown-item-links"
            :onclose="() => changeDropdownValue('appsVisible', false)"
          >
            <dropdown-link-main margin-top margin-bottom>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-tv />
              </icon-base>
              <span class="dropdown-link-main-text"> YouTube TV </span>
            </dropdown-link-main>
            <dropdown-link-main margin-top border-top>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-music />
              </icon-base>
              <span class="dropdown-link-main-text"> YouTube Music </span>
            </dropdown-link-main>
            <dropdown-link-main margin-bottom border-bottom>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube-kids />
              </icon-base>
              <span class="dropdown-link-main-text"> YouTube Kids </span>
            </dropdown-link-main>
            <dropdown-link-main margin-top>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube />
              </icon-base>
              <span class="dropdown-link-main-text"> Creator Academy </span>
            </dropdown-link-main>
            <dropdown-link-main margin-bottom>
              <icon-base class="dropdown-link-main-icon">
                <icon-youtube />
              </icon-base>
              <span class="dropdown-link-main-text"> YouTube for Artists </span>
            </dropdown-link-main>
          </dropdown-item>
        </dropdown-container>
        <dropdown-container>
          <detail-popup-container>
            <transparent-button
              :rippleEffect="true"
              :padding="`8px`"
              :margin="`0 8px 0 0`"
              @click="changeDropdownValue('notificationVisible', true)"
              class="navbarRight-notificationButton"
            >
              <icon-base class="icon"><icon-notification /></icon-base>
            </transparent-button>
            <detail-popup-item :vDirection="'bottom'" :hDirection="'right'">
              Notifications
            </detail-popup-item>
          </detail-popup-container>

          <dropdown-item
            :visible="dropdownVisibleValues.notificationVisible.value"
            :direction="'left'"
            class="dropdown-notification-container"
            :onclose="() => changeDropdownValue('notificationVisible', false)"
          >
            <div class="dropdown-notification-header">
              <h1>Notifications</h1>
              <transparent-button
                :rippleEffect="true"
                :padding="`8px`"
                :margin="`0 8px 0 0`"
              >
                <icon-base class="icon"><icon-settings /></icon-base>
              </transparent-button>
            </div>
            <div class="dropdown-notification-item-container sc-scroll-two">
              <a
                href="#"
                v-for="(item, index) in notificationTexts"
                :key="item"
                class="dropdown-notification-item"
              >
                <div class="dropdown-notification-item-left">
                  <img
                    src="@/assets/pp2.jpg"
                    class="dropdown-notification-item-pp"
                  />
                  <span class="dropdown-notification-item-text">{{
                    item
                  }}</span>
                  <img
                    :src="`https://source.unsplash.com/random/1280x720?sig=${
                      index + 1
                    }`"
                    class="dropdown-notification-item-thumb"
                  />
                </div>
                <div class="dropdown-notification-item-right">
                  <dropdown-container>
                    <transparent-button
                      :rippleEffect="true"
                      :padding="`8px`"
                      :margin="'0 0 0 8px'"
                      class="dropdown-notification-item-sub-options"
                      @click="changeDropdownValueSubSettings(index, true)"
                    >
                      <icon-base
                        class="dropdown-notification-item-sub-options-icon"
                        ><icon-three-dot-v
                      /></icon-base>
                    </transparent-button>
                    <dropdown-item
                      :visible="
                        dropdownVisibleValues.notificationSubSettingsVisible
                          .value[index]
                      "
                      :direction="'left'"
                      class="dropdown-notification-sub-options-container"
                      :onclose="
                        () => changeDropdownValueSubSettings(index, false)
                      "
                    >
                      <dropdown-link-main margin-top>
                        <icon-base
                          class="dropdown-link-main-icon unvisible-icon"
                        >
                          <icon-un-visible />
                        </icon-base>
                        <span class="dropdown-link-main-text">
                          Hide this notification
                        </span>
                      </dropdown-link-main>
                      <dropdown-link-main margin-bottom>
                        <icon-base class="dropdown-link-main-icon"> </icon-base>
                        <span class="dropdown-link-main-text">
                          Turn off all from Albert Einstein
                        </span>
                      </dropdown-link-main>
                    </dropdown-item>
                  </dropdown-container>
                </div>
              </a>
            </div>
          </dropdown-item>
        </dropdown-container>
        <dropdown-container>
          <transparent-button
            :padding="'0 14px'"
            @click="changeDropdownValue('profileVisible', true)"
            class="navbarRight-profileButton"
          >
            <avatar-main />
          </transparent-button>
          <dropdown-item
            :visible="dropdownVisibleValues.profileVisible.value"
            :direction="'left'"
            class="dropdown-profile-visible"
            :onclose="() => changeDropdownValue('profileVisible', false)"
          >
            <div class="dropdown-profile-visible-header">
              <div class="dropdown-profile-visible-header-pp-container">
                <img
                  class="dropdown-profile-visible-header-pp"
                  src="@/assets/pp.png"
                />
              </div>
              <div class="dropdown-profile-visible-header-account">
                <h1>Mustafa Emin</h1>
                <a href="#">Manage your Google Account</a>
              </div>
            </div>
            <dropdown-link-main margin-top>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-user />
              </icon-base>
              <span class="dropdown-link-main-text"> Your channel </span>
            </dropdown-link-main>
            <dropdown-link-main>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-coin />
              </icon-base>
              <span class="dropdown-link-main-text">
                Purchases and memberships
              </span>
            </dropdown-link-main>
            <dropdown-link-main>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-studio />
              </icon-base>
              <span class="dropdown-link-main-text"> Youtube Studio </span>
            </dropdown-link-main>
            <dropdown-link-main :showArrow="true">
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-users />
              </icon-base>
              <span class="dropdown-link-main-text"> Switch account </span>
            </dropdown-link-main>
            <dropdown-link-main margin-bottom border-bottom>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-sign-out />
              </icon-base>
              <span class="dropdown-link-main-text"> Sign out </span>
            </dropdown-link-main>
            <dropdown-link-main :showArrow="true" margin-top>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-dark-light />
              </icon-base>
              <span class="dropdown-link-main-text"> Appearance: Dark </span>
            </dropdown-link-main>
            <dropdown-link-main :showArrow="true">
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-language />
              </icon-base>
              <span class="dropdown-link-main-text"> Language: English </span>
            </dropdown-link-main>
            <dropdown-link-main :showArrow="true">
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-world />
              </icon-base>
              <span class="dropdown-link-main-text"> Location: Turkey </span>
            </dropdown-link-main>
            <dropdown-link-main>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-settings />
              </icon-base>
              <span class="dropdown-link-main-text"> Settings </span>
            </dropdown-link-main>
            <dropdown-link-main>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-user-shield />
              </icon-base>
              <span class="dropdown-link-main-text">
                Your data in YouTube
              </span>
            </dropdown-link-main>
            <dropdown-link-main>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-help />
              </icon-base>
              <span class="dropdown-link-main-text"> Help </span>
            </dropdown-link-main>
            <dropdown-link-main>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-feedback />
              </icon-base>
              <span class="dropdown-link-main-text"> Send feedback </span>
            </dropdown-link-main>
            <dropdown-link-main margin-bottom border-bottom>
              <icon-base class="dropdown-link-main-icon icon-right"
                ><icon-keyboard />
              </icon-base>
              <span class="dropdown-link-main-text"> Keyboard shortcuts </span>
            </dropdown-link-main>
            <dropdown-link-main margin-top :showArrow="true">
              <span class="dropdown-link-main-just-text">
                Restricted Mode: Off
              </span>
            </dropdown-link-main>
          </dropdown-item>
        </dropdown-container>
      </div>
    </div>

    <div class="content">
      <div
        v-show="sidebarBlock && showSidebarBlock"
        class="sidebar-large-fill-box"
      ></div>
      <div
        v-show="sidebarBlock && showSidebarBlock"
        class="sidebar-large sidebar-large-block sc-scroll-three"
      >
        <dropdown-link-main
          href="#"
          class="sidebar-large-item sidebar-large-item-active"
        >
          <icon-base class="sidebar-large-icon">
            <icon-home />
          </icon-base>
          <span>Home</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-explore />
          </icon-base>
          <span>Explore</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-subscriptions />
          </icon-base>
          <span>Subscriptions</span>
        </dropdown-link-main>
        <dropdown-link-main margin-top href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-library />
          </icon-base>
          <span>Library</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-history />
          </icon-base>
          <span>History</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-play-bordered />
          </icon-base>
          <span>Your videos</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-clock />
          </icon-base>
          <span>Watch later</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-like />
          </icon-base>
          <span>Liked videos</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-down-arrow />
          </icon-base>
          <span>Show more</span>
        </dropdown-link-main>
        <text-one type-second :margin="'18px 0 0 24px'">SUBSCRIPTIONS</text-one>
        <!-- SUBS -->
        <dropdown-link-main margin-top href="#" class="sidebar-large-subs-item">
          <img src="@/assets/pp2.jpg" class="sidebar-large-subs-item-img" />
          <span>Albert Einstein</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/isaac-newton.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Isaac Newton</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/marie-curie.png"
            class="sidebar-large-subs-item-img"
          />
          <span>Marie Curie</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/nikola-tesla.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Nikola Tesla</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/charles-darwin.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Charles Darwin</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/dennis-ritchie.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Dennis Ritchie</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/galileo-galilei.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Galileo Galilei</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-down-arrow />
          </icon-base>
          <span>Show more</span>
        </dropdown-link-main>
        <!-- MORE -->
        <text-one type-second :margin="'18px 0 0 24px'"
          >MORE FROM YOUTUBE</text-one
        >
        <dropdown-link-main margin-top href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-youtube-gray />
          </icon-base>
          <span>YouTube Premium</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-gaming />
          </icon-base>
          <span>Gaming</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-live />
          </icon-base>
          <span>Live</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-champ-cup />
          </icon-base>
          <span>Sports</span>
        </dropdown-link-main>
        <dropdown-link-main margin-top href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-settings />
          </icon-base>
          <span>Settings</span>
        </dropdown-link-main>

        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-flag />
          </icon-base>
          <span>Report history</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-help />
          </icon-base>
          <span>Help</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-feedback />
          </icon-base>
          <span>Send feedback</span>
        </dropdown-link-main>
      </div>
      <!-- SIDEBAR LARGE DRAWER -->
      <div
        v-show="showSidebarDrawer"
        @click="showDrawerSidebarToggle()"
        class="opacity-bg"
      ></div>
      <div
        class="sidebar-large sidebar-large-drawer-container sc-scroll-three"
        :class="{
          'sidebar-large-drawer': !showSidebarDrawer,
          'sidebar-large-drawer-active': showSidebarDrawer,
        }"
      >
        <div class="sidebar-drawer-header">
          <transparent-button
            class="sidebar-drawer-header-button"
            :rippleEffect="true"
            :padding="`7px 8px 7px 4px`"
            @click="showDrawerSidebarToggle()"
          >
            <icon-base class="icon"><icon-bar /></icon-base>
          </transparent-button>
          <transparent-button :padding="`16px 14px 16px 16px`">
            <main-logo />
          </transparent-button>
        </div>
        <dropdown-link-main
          href="#"
          class="sidebar-large-item sidebar-large-item-active"
        >
          <icon-base class="sidebar-large-icon">
            <icon-home />
          </icon-base>
          <span>Home</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-explore />
          </icon-base>
          <span>Explore</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-subscriptions />
          </icon-base>
          <span>Subscriptions</span>
        </dropdown-link-main>
        <dropdown-link-main margin-top href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-library />
          </icon-base>
          <span>Library</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-history />
          </icon-base>
          <span>History</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-play-bordered />
          </icon-base>
          <span>Your videos</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-clock />
          </icon-base>
          <span>Watch later</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-like />
          </icon-base>
          <span>Liked videos</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-down-arrow />
          </icon-base>
          <span>Show more</span>
        </dropdown-link-main>
        <text-one type-second :margin="'18px 0 0 24px'">SUBSCRIPTIONS</text-one>
        <!-- SUBS -->
        <dropdown-link-main margin-top href="#" class="sidebar-large-subs-item">
          <img src="@/assets/pp2.jpg" class="sidebar-large-subs-item-img" />
          <span>Albert Einstein</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/isaac-newton.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Isaac Newton</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/marie-curie.png"
            class="sidebar-large-subs-item-img"
          />
          <span>Marie Curie</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/nikola-tesla.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Nikola Tesla</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/charles-darwin.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Charles Darwin</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/dennis-ritchie.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Dennis Ritchie</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-subs-item">
          <img
            src="@/assets/galileo-galilei.jpg"
            class="sidebar-large-subs-item-img"
          />
          <span>Galileo Galilei</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-down-arrow />
          </icon-base>
          <span>Show more</span>
        </dropdown-link-main>
        <!-- MORE -->
        <text-one type-second :margin="'18px 0 0 24px'"
          >MORE FROM YOUTUBE</text-one
        >
        <dropdown-link-main margin-top href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-youtube-gray />
          </icon-base>
          <span>YouTube Premium</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-gaming />
          </icon-base>
          <span>Gaming</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-live />
          </icon-base>
          <span>Live</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-champ-cup />
          </icon-base>
          <span>Sports</span>
        </dropdown-link-main>
        <dropdown-link-main margin-top href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-settings />
          </icon-base>
          <span>Settings</span>
        </dropdown-link-main>

        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-flag />
          </icon-base>
          <span>Report history</span>
        </dropdown-link-main>
        <dropdown-link-main href="#" class="sidebar-large-item">
          <icon-base class="sidebar-large-icon">
            <icon-help />
          </icon-base>
          <span>Help</span>
        </dropdown-link-main>
        <dropdown-link-main
          margin-bottom
          border-bottom
          href="#"
          class="sidebar-large-item"
        >
          <icon-base class="sidebar-large-icon">
            <icon-feedback />
          </icon-base>
          <span>Send feedback</span>
        </dropdown-link-main>
      </div>
      <!-- SIDEBAR SMALL -->
      <div
        class="sidebar-fill-box"
        v-show="sidebarBlock && !showSidebarBlock"
      ></div>
      <div v-show="sidebarBlock && !showSidebarBlock" class="sidebar">
        <a href="#" class="sidebar-item sidebar-item-active">
          <icon-base class="sidebar-icon">
            <icon-home />
          </icon-base>
          <span>Home</span>
        </a>
        <a href="#" class="sidebar-item">
          <icon-base class="sidebar-icon">
            <icon-explore />
          </icon-base>
          <span>Explore</span>
        </a>
        <a href="#" class="sidebar-item">
          <icon-base class="sidebar-icon">
            <icon-subscriptions />
          </icon-base>
          <span>Subscriptions</span>
        </a>
        <a href="#" class="sidebar-item">
          <icon-base class="sidebar-icon">
            <icon-library />
          </icon-base>
          <span>Library</span>
        </a>
      </div>
      <div
        class="content-container"
        :class="{
          'content-container-show-navbar': showNavbar,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import IconBase from "@/components/Icon/BaseIcon.vue";
import IconYoutubeMusic from "@/components/Icon/Icons/YoutubeMusic.vue";
import IconYoutubeKids from "@/components/Icon/Icons/YoutubeKids.vue";
import IconYoutube from "@/components/Icon/Icons/Youtube.vue";
import IconYoutubeTv from "@/components/Icon/Icons/YoutubeTV.vue";
import IconApps from "@/components/Icon/Icons/Apps.vue";
import IconAddVideo from "@/components/Icon/Icons/AddVideo.vue";
import IconNotification from "@/components/Icon/Icons/Notification.vue";
import IconSettings from "@/components/Icon/Icons/Settings.vue";
import IconThreeDotV from "@/components/Icon/Icons/ThreeDotV.vue";
import IconUnVisible from "@/components/Icon/Icons/UnVisible.vue";
import IconCoin from "@/components/Icon/Icons/Coin.vue";
import IconStudio from "@/components/Icon/Icons/Studio.vue";
import IconUsers from "@/components/Icon/Icons/Users.vue";
import IconSignOut from "@/components/Icon/Icons/SignOut.vue";
import IconUser from "@/components/Icon/Icons/User.vue";
import IconDarkLight from "@/components/Icon/Icons/DarkLight.vue";
import IconLanguage from "@/components/Icon/Icons/Language.vue";
import IconWorld from "@/components/Icon/Icons/World.vue";
import IconUserShield from "@/components/Icon/Icons/UserShield.vue";
import IconHelp from "@/components/Icon/Icons/Help.vue";
import IconFeedback from "@/components/Icon/Icons/Feedback.vue";
import IconKeyboard from "@/components/Icon/Icons/Keyboard.vue";
import IconHome from "@/components/Icon/Icons/Home.vue";
import IconExplore from "@/components/Icon/Icons/Explore.vue";
import IconSubscriptions from "@/components/Icon/Icons/Subscriptions.vue";
import IconLibrary from "@/components/Icon/Icons/Library.vue";
import IconHistory from "@/components/Icon/Icons/History.vue";
import IconBar from "@/components/Icon/Icons/Bar.vue";
import IconSearch from "@/components/Icon/Icons/Search.vue";
import IconPlayBordered from "@/components/Icon/Icons/PlayBordered.vue";
import IconClock from "@/components/Icon/Icons/Clock.vue";
import IconLike from "@/components/Icon/Icons/Like.vue";
import IconYoutubeGray from "@/components/Icon/Icons/YoutubeGray.vue";
import IconLive from "@/components/Icon/Icons/Live.vue";
import IconFlag from "@/components/Icon/Icons/Flag.vue";
import IconGaming from "@/components/Icon/Icons/Gaming.vue";
import IconChampCup from "@/components/Icon/Icons/ChampCup.vue";
import IconDownArrow from "@/components/Icon/Icons/DownArrow.vue";
import IconBackLineArrow from "@/components/Icon/Icons/BackLineArrow.vue";
import TransparentButton from "@/components/Input/Button/TransparentButton/TransparentButton.vue";
import DropdownLinkMain from "@/components/Input/Button/Dropdown/DropdownLinkMain.vue";
import AvatarMain from "@/components/Avatar/AvatarMain/AvatarMain.vue";
import DropdownContainer from "@/components/Dropdown/DropdownContainer/DropdownContainer.vue";
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem.vue";
import MainLogo from "@/components/Logo/LogoMain.vue";
import TextOne from "../Text/TextOne.vue";
import SearchBar from "@/components/Input/Search/SearchBar.vue";
import DetailPopupItem from "@/components/Popup/DetailPopupItem.vue";
import DetailPopupContainer from "@/components/Popup/DetailPopupContainer.vue";

interface DropdownVisibleValues {
  appsVisible: boolean;
  addVideoVisible: boolean;
  notificationVisible: boolean;
  profileVisible: boolean;
  notificationSubSettingsVisible: Array<boolean>;
}

export default defineComponent({
  name: "Layout",
  components: {
    IconBase,
    IconBar,
    TransparentButton,
    MainLogo,
    IconSearch,
    IconApps,
    IconAddVideo,
    IconNotification,
    AvatarMain,
    DropdownContainer,
    DropdownItem,
    DropdownLinkMain,
    IconYoutubeTv,
    IconYoutube,
    IconYoutubeMusic,
    IconYoutubeKids,
    IconSettings,
    IconThreeDotV,
    IconUnVisible,
    IconUser,
    IconCoin,
    IconStudio,
    IconUsers,
    IconSignOut,
    IconDarkLight,
    IconLanguage,
    IconWorld,
    IconUserShield,
    IconHelp,
    IconFeedback,
    IconKeyboard,
    IconHome,
    IconExplore,
    IconSubscriptions,
    IconLibrary,
    IconHistory,
    IconPlayBordered,
    IconClock,
    IconLike,
    IconDownArrow,
    TextOne,
    IconLive,
    IconFlag,
    IconGaming,
    IconChampCup,
    IconYoutubeGray,
    IconBackLineArrow,
    SearchBar,
    DetailPopupItem,
    DetailPopupContainer,
  },
  props: {
    sidebarBlock: {
      type: Boolean,
      default: false,
    },
    showNavbar: {
      type: Boolean,
      default: true,
    },
    hideLayoutScrollBar: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const notificationTexts = ref<Array<string>>([
      "Albert Einstein just uploaded a video: Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that is stupid.",
      "Albert Einstein just uploaded a video: Logic will get you from A to B. Imagination will take you everywhere.”",
      "Albert Einstein just uploaded a video: I found out atom for the benefit of humanity but they kill each other with it.",
      "Albert Einstein just uploaded a video: Strive not to be a success, but rather to be of value.",
      "Albert Einstein just uploaded a video: Do you wonder what the difference between ignorance and genius is ? A Genius has limits but an ignorant doesn’t have any.",
      "Albert Einstein just uploaded a video: I going holiday to Istanbul with Heisenberg.",
    ]);

    const dropdownVisibleValuesReactive = reactive({
      appsVisible: false,
      addVideoVisible: false,
      notificationVisible: false,
      notificationSubSettingsVisible: notificationTexts.value.map(() => false),
      profileVisible: false,
    } as DropdownVisibleValues);

    const dropdownVisibleValues = toRefs(dropdownVisibleValuesReactive);

    const changeDropdownValue = (
      valueName:
        | "appsVisible"
        | "addVideoVisible"
        | "notificationVisible"
        | "notificationSubSettingsVisible"
        | "profileVisible",
      newValue: boolean
    ) => {
      dropdownVisibleValues[valueName].value = newValue;
    };

    const changeDropdownValueSubSettings = (
      index: number,
      newValue: boolean
    ) => {
      dropdownVisibleValues["notificationSubSettingsVisible"].value[index] =
        newValue;
    };
    // SHOW SIDEBAR
    const showSidebarDrawer = ref<boolean>(false);
    const showDrawerSidebarToggle = () => {
      showSidebarDrawer.value = !showSidebarDrawer.value;
    };

    const showSidebarBlock = ref<boolean>(false);
    const showBlockSidebarToggle = () => {
      showSidebarBlock.value = !showSidebarBlock.value;
    };

    // SHOW SMALL SEARCH BAR
    const isSmallSearchActive = ref<boolean>(false);
    const fullWidthSearchVisibleToggle = () => {
      isSmallSearchActive.value = !isSmallSearchActive.value;
    };
    return {
      dropdownVisibleValues,
      changeDropdownValue,
      changeDropdownValueSubSettings,
      notificationTexts,
      showSidebarDrawer,
      showDrawerSidebarToggle,
      showSidebarBlock,
      showBlockSidebarToggle,
      isSmallSearchActive,
      fullWidthSearchVisibleToggle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mediaQueries/mediaQueries.scss";
@import "@/styles/scroll/scroll.scss";

.layout {
  overflow: hidden;
  min-height: 100vh;

  &.layout-hide-scrollbar {
    &::-webkit-scrollbar {
      display: none !important;
    }
  }
  & .icon {
    z-index: 1;
  }
  & .navbar,
  & .sidebar,
  & .sidebar-large {
    position: fixed !important;
    z-index: var(--layout-z);
  }

  & .sidebar-large-drawer-container {
    z-index: var(--sidebar-drawer-z) !important;
  }

  & .sidebar,
  & .sidebar-large {
    top: var(--height-of-navbar);
  }

  .navbar {
    height: var(--height-of-navbar);
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--layout-bg-color);

    & .navbar-searchSmallSize {
      display: none;
      align-items: center;
      width: 95%;

      @include MQ656 {
        &[active="active"] {
          display: flex;
        }
      }

      &[active="active"] + .navbar-left,
      &[active="active"] + .navbar-left + .navbar-middle,
      &[active="active"] + .navbar-left + .navbar-middle + .navbar-right {
        display: none;
      }

      @include MQ656Min {
        & + .navbar-left,
        & + .navbar-left + .navbar-middle,
        & + .navbar-left + .navbar-middle + .navbar-right {
          display: flex !important;
        }
      }

      & .navbar-searchSmallSizeSearchBar {
        margin-left: 10px;
      }
    }

    & .navbar-left {
      display: flex;
      align-items: center;
      margin-left: 20px;

      & .sidebar-block-button[sidebarActive="false"] {
        display: none !important;
      }

      @include MQ800 {
        & .sidebar-block-button[sidebarActive="true"] {
          display: none;
        }
        & .sidebar-block-button[sidebarActive="true"] + .sidebar-drawer-button {
          display: flex;
        }
      }
      @include MQ800Min {
        & .sidebar-block-button[sidebarActive="true"] {
          display: flex;
        }
        & .sidebar-block-button[sidebarActive="true"] + .sidebar-drawer-button {
          display: none;
        }
      }
    }

    & .navbar-middle {
      display: flex;
      width: 100%;
      max-width: 640px;
      min-width: 136px;
      @include MQ656 {
        display: none;
      }

      & .searchBar {
        max-width: 640px;
        min-width: 136px;
      }
    }

    & .navbar-right {
      display: flex;
      margin-right: 20px;

      & .icon-right {
        fill: var(--icon-color);
      }

      & .dropdown-item-links {
        width: 220px;
      }

      & button {
        margin-right: 8px;
      }

      & g {
        fill: var(--white);
      }

      & .navbar-right-search-button {
        display: none;

        @include MQ656 {
          display: flex;
        }
      }

      & .dropdown-notification-container {
        width: 478px;
        max-height: 642px;
        height: 100vh;

        & .dropdown-notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 49px;
          border-bottom: 1px solid var(--border-color);
          & h1 {
            margin-left: 16px;
          }
        }

        & .dropdown-notification-item-container {
          overflow-y: scroll;
          overflow-x: hidden;
          max-height: 592px;
          height: 100%;
          position: relative;
          width: 478px;

          & .dropdown-notification-item {
            padding: 16px 16px 16px 0;
            display: flex;
            justify-content: flex-start;

            &:hover {
              background: var(--bg-hover);
              & .dropdown-notification-item-right {
                visibility: visible;
              }
            }

            & .dropdown-notification-item-left {
              display: flex;

              & .dropdown-notification-item-pp {
                width: 48px;
                height: 48px;
                margin: 0 16px;
                border-radius: 50%;
              }

              & .dropdown-notification-item-text {
                display: inline-block;
                letter-spacing: 0.2px;
                padding-bottom: 8px;
                line-height: 20px;
                font-size: 15px;
                width: 232px;
              }

              & .dropdown-notification-item-thumb {
                margin: 0 0 0 16px;
                width: 86px;
                max-height: 64.5px;
                object-fit: contain;
              }
            }

            & .dropdown-notification-item-right {
              display: flex;
              justify-content: center;
              visibility: hidden;
              height: 100%;
              & .dropdown-notification-item-sub-options {
                width: 40px;
                height: 40px;
                &:hover {
                  & .dropdown-notification-item-sub-options-icon {
                    fill: var(--icon-hover-color);
                  }
                }

                & .dropdown-notification-item-sub-options-icon {
                  fill: var(--icon-color);
                }
              }
            }
            & .dropdown-notification-sub-options-container {
              width: 284px;

              & .unvisible-icon {
                fill: var(--icon-color);
              }
            }
          }
        }
      }

      & .dropdown-profile-visible {
        overflow-y: auto;
        overflow-x: hidden;
        @extend .sc-scroll-two;
        height: 90vh;
        & .dropdown-profile-visible-header {
          display: flex;
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
          & .dropdown-profile-visible-header-pp-container {
            margin-right: 16px;
            & .dropdown-profile-visible-header-pp {
              height: 40px;
              width: 40px;
              border-radius: 50%;
            }
          }

          & .dropdown-profile-visible-header-account {
            & h1 {
              margin-top: 4px;
            }

            & a {
              display: inline-block;
              white-space: nowrap;
              margin-top: 14px;
              font-size: 15px;
              color: var(--link-color);
            }
          }
        }
      }
    }
  }

  & .content {
    display: flex;

    & .content-container {
      width: 100%;

      &.content-container-show-navbar {
        margin-top: var(--height-of-navbar);
      }
    }

    .opacity-bg {
      z-index: var(--sidebar-drawer-bg-z);
    }

    .sidebar-large-drawer-base {
      position: absolute;
      transition: transform 0.2s;
      z-index: var(--opacity-bg-item-z);
      top: 0;

      & .sidebar-drawer-header {
        display: flex;
        align-items: center;
        margin-left: 20px;
      }
    }

    & .sidebar-large-drawer {
      @extend .sidebar-large-drawer-base;
      transform: translateX(-100%);
    }

    & .sidebar-large-drawer-active {
      @extend .sidebar-large-drawer-base;
      transform: translateX(0);
    }

    & .sidebar-large-fill-box {
      // +10PX is scroll width
      width: 250px;
      max-height: 100%;
      height: 100vh;
    }

    & .sidebar-large {
      width: 240px;
      max-height: 100%;
      height: 100vh;
      background: var(--layout-bg-color);
      overflow-y: scroll;

      & .sidebar-large-item {
        display: flex;
        align-items: center;

        & .sidebar-large-icon {
          fill: var(--sidebar-icon-color);
          margin: 0 24px;
        }

        & span {
          display: inline-block;
          font-size: 15px;
        }

        &.sidebar-large-item-active {
          background: var(--dropdown-link-main-bg-focus);
          & .sidebar-large-icon {
            fill: var(--sidebar-icon-active-color);
            margin: 0 24px;
          }

          & span {
            display: block;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }

      & .sidebar-large-subs-item {
        display: flex;
        align-items: center;

        & .sidebar-large-subs-item-img {
          margin: 0 24px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        & span {
          display: inline-block;
          font-size: 15px;
        }

        &.sidebar-large-item-active {
          background: var(--dropdown-link-main-bg-focus);
          & .sidebar-large-icon {
            fill: var(--sidebar-icon-active-color);
            margin: 0 24px;
          }

          & span {
            display: block;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }

    & .sidebar-fill-box {
      height: 100vh;
      width: 72px;
    }

    & .sidebar {
      height: 100vh;
      width: 72px;
      background: var(--layout-bg-color);
      & .sidebar-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        padding: 14px 0;
        &:hover {
          background: var(--sidebar-item-hover-bg);
        }

        & .sidebar-icon {
          fill: var(--sidebar-icon-color);
          margin-bottom: 8px;
        }
        &.sidebar-item-active {
          & .sidebar-icon {
            fill: var(--sidebar-icon-active-color);
          }
          & span {
            display: inline-block;
            font-size: 10px;
            color: var(--sidebar-icon-active-color);
          }
        }

        & span {
          display: inline-block;
          font-size: 10px;
        }
      }
    }
    @include MQ800 {
      .sidebar,
      .sidebar-fill-box,
      .sidebar-large-block,
      .sidebar-large-fill-box {
        display: none;
      }
    }
  }
}
</style>
