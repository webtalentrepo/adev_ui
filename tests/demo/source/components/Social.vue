<template>
  <div class="sidebar ui-dark">
    <Accordion>
      <AccordionPanel v-for="(platform, name) in platforms"
                      :key="name" :active="platform.show">
        <AccordionPanelHeader>
          <label class="ui-control ui-switch ui-align-right">
            <input type="checkbox" v-model="platform.show"/>
            <span class="ui-control-indicator"></span>
            <span>{{platform.label}}</span>
          </label>
        </AccordionPanelHeader>
        <AccordionPanelContent>
          <div class="ui-input-group">
            <input type="text"
                   placeholder="http://"
                   class="ui-input"
                   :name="`${name}`"
                   v-validate="'required|url'"
                   v-model="platform.url"
                   @keyup="setLink(name)">
            <span class="ui-icon"
                  :class="{'ui-icon-warning-sign': errors.has(name) || !platform.url, 'ui-icon-tick': !errors.has(name)}">
            </span>
          </div>
        </AccordionPanelContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script>
import Accordion from '@/components/Accordion'
export default {
  components: { Accordion },
  data: () => ({
    platforms: {
      facebook: { label: 'Facebook', url: '', show: true },
      twitter: { label: 'Twitter', url: '', show: true },
      linkedin: { label: 'LinkedIn', url: '', show: true },
      instagram: { label: 'Instagram', url: '', show: true },
      pinterest: { label: 'Pinterest', url: '', show: true },
      youtube: { label: 'Youtube', url: '', show: true },
      'google-plus': { label: 'Google Plus', url: '', show: true }
    },
  }),
  methods: {
    setLink() { },
    toggleIcon() { }
  }
}
</script>

<style lang="stylus">
  .sidebar {
    width: 300px;
    padding: 20px;
  }
  .ui-accordion-panel-header .ui-control {
    margin: 0;
    min-height: auto;
    outline: none;
    width: 100%;
    .ui-control-indicator {
      outline: 0 !important;
    }
  }
</style>

