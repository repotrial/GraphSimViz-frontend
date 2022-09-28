<template>
  <div style="width: 100%;  padding: 16px">
    <!--    <div v-if="isMobile()" style="display: flex; margin-bottom: 16px">-->
    <!--      <v-btn color="primary" @click="checkEvent" style="margin-left: auto; margin-right: 0; justify-self: flex-end">-->
    <!--        Validate-->
    <!--        <v-icon right>fas fa-angle-right</v-icon>-->
    <!--      </v-btn>-->
    <!--    </div>-->
    <div v-bind:class="{flex:!mobile}">
      <!--      <div v-if="(mode==='set' || mode ==='network') && type==='gene'"-->
      <!--           :class="{flex_self_center:!mobile, example_div_width:mobile}">-->
      <!--        <v-btn color="primary" :class="{flex_self_center:mobile}" outlined @click="loadExample(mode, 'gene', mode)">-->
      <!--          <v-icon left>far fa-lightbulb</v-icon>-->
      <!--          {{ mode === 'network' ? 'Subnetwork Example' : 'Set only Example' }}-->
      <!--        </v-btn>-->
      <!--      </div>-->
      <!--      <div v-if="(mode==='set') && type==='gene'"-->
      <!--           :class="{flex_self_center:!mobile, example_div_width:mobile}">-->
      <!--        <v-btn color="primary" :class="{flex_self_center:mobile}" outlined @click="loadExample(mode, 'gene', 'ref')">-->
      <!--          <v-icon left>far fa-lightbulb</v-icon>-->
      <!--          Reference Example-->
      <!--        </v-btn>-->
      <!--      </div>-->
      <!--      <div v-if="mode==='cluster' && type==='gene'" :class="{flex_self_center:!mobile, example_div_width:mobile}">-->
      <!--        <v-btn color="primary" :class="{flex_self_center:mobile}" outlined-->
      <!--               @click="loadExample('cluster', 'gene')">-->
      <!--          <v-icon left>far fa-lightbulb</v-icon>-->
      <!--          Example-->
      <!--        </v-btn>-->
      <!--      </div>-->
      <!--      <div v-if="mode==='network' && type==='gene'" :class="{flex_self_center:!mobile, example_div_width:mobile}">-->
      <!--        <v-btn color="primary" :class="{flex_self_center:mobile}" outlined-->
      <!--               @click="getExampleNetwork()">-->
      <!--          <v-icon left>fas fa-download</v-icon>-->
      <!--          Get example network-->
      <!--        </v-btn>-->
      <!--      </div>-->
      <!--      <div v-if="mode==='cluster' && type==='disease'" :class="{flex_self_center:!mobile, example_div_width:mobile}">-->
      <!--        <v-btn color="primary" :class="{flex_self_center:mobile}"-->
      <!--               outlined-->
      <!--               @click="loadExample('cluster', 'disease')">-->
      <!--          <v-icon left>far fa-lightbulb</v-icon>-->
      <!--          Example-->
      <!--        </v-btn>-->
      <!--      </div>-->
      <!--      <div v-if="(mode==='set' || mode ==='network') && type==='disease'"-->
      <!--           :class="{flex_self_center:!mobile, example_div_width:mobile}">-->
      <!--        <v-btn color="primary" outlined :class="{flex_self_center:mobile}"-->
      <!--               @click="loadExample(mode, 'disease')">-->
      <!--          <v-icon left>far fa-lightbulb</v-icon>-->
      <!--          {{ mode === 'network' ? 'Subnetwork Example' : 'Set only Example' }}-->
      <!--        </v-btn>-->
      <!--      </div>-->
      <!--      <v-btn v-if="!isMobile()" color="primary" @click="checkEvent"-->
      <!--             style="margin-left: auto; margin-right: 0; justify-self: flex-end">-->
      <!--        Validate-->
      <!--        <v-icon right>fas fa-angle-right</v-icon>-->
      <!--      </v-btn>-->
    </div>
    <v-sheet style="margin-top: 16px;">
      <v-divider></v-divider>
      <div style="display: flex; justify-content: center">
        <v-subheader :class="{sh_mobile:mobile, sh:!mobile}">
          1. Network type
        </v-subheader>
      </div>
      <!--      <v-alert v-if="errorTargetID" type="error" dense>Missing target ID type selection</v-alert>-->
      <!--      <v-alert v-if="errorTargetIDs" type="error" dense>Missing targetIDs</v-alert>-->
      <v-container :class="{border_mobile:mobile, border:!mobile}">
        <v-row justify="center">
          <v-col cols="12" lg="4" :class="{'flex_content_center':mobile}">
            <v-container style="padding-top: 16px">
              <v-row justify="center" justify-lg="start">
                <v-col cols="12" md="6" lg="12" class="flex_content_center">
                  <v-select label="Network type" :items="networkTypes"
                            v-model="networkType" append-icon="mdi-menu-down"
                            style="max-width: 210px; min-width: 210px" outlined dense filled hide-details
                            @change="scrollDown(true)">
                    <template v-slot:append-outer>
                      <v-tooltip right>
                        <template v-slot:activator="{on, attrs}">
                          <v-icon v-bind="attrs" v-on="on">far fa-question-circle</v-icon>
                        </template>
                        <div style="width: 250px; text-align: justify">
                          TODO tooltip
                        </div>
                      </v-tooltip>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <template v-if="networkType && networkType !== 'drug-disease'">
        <div style="display: flex; justify-content: center">
          <v-subheader :class="{sh_mobile:mobile, sh:!mobile}">2. Specify Network Sources</v-subheader>
        </div>
        <!--        <v-alert v-if="errorNetworkFormat" type="error" dense>Network format is not of accepted type (.sif, .gt,-->
        <!--          .graphml)!-->
        <!--        </v-alert>-->
        <!--        <v-alert v-if="errorNetworkIDType" type="error" dense>Missing node id type definition!</v-alert>-->
        <!--        <v-alert v-if="errorNetworkNodeName" type="error" dense>Missing node attribute name!</v-alert>-->
        <v-container style="margin-bottom: 32px">
          <v-row>
            <v-col class="flex_content_center">
              <v-container>
                <v-row style="margin: 8px" justify="center">
                  <v-col>
                    <v-select label="Network 1" :items="networks[networkType]" v-model="network1"
                              append-icon="mdi-menu-down"
                              style="max-width: 210px; min-width: 210px" outlined dense filled hide-details
                              @change="scrollDown(network1 && network2)">
                      <template v-slot:append-outer>
                        <v-tooltip right>
                          <template v-slot:activator="{on, attrs}">
                            <v-icon v-bind="attrs" v-on="on">far fa-question-circle</v-icon>
                          </template>
                          <div style="width: 250px; text-align: justify">
                            TODO tooltip
                          </div>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="1" class="flex_content_center">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col class="flex_content_center">
              <v-container>
                <v-row style="margin: 8px" justify="center">
                  <v-col>
                    <v-select label="Network 2" :items="networks[networkType]" v-model="network2"
                              append-icon="mdi-menu-down"
                              style="max-width: 210px; min-width: 210px" outlined dense filled hide-details
                              @change="scrollDown(network1 && network2)">
                      <template v-slot:append-outer>
                        <v-tooltip right>
                          <template v-slot:activator="{on, attrs}">
                            <v-icon v-bind="attrs" v-on="on">far fa-question-circle</v-icon>
                          </template>
                          <div style="width: 250px; text-align: justify">
                            TODO tooltip
                          </div>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
      </template>
      <template v-if="network2 && network1">
        <div style="display: flex; justify-content: center">
          <v-subheader :class="{sh_mobile:mobile, sh:!mobile}">3. Nodes</v-subheader>
        </div>
        <v-container :class="{border_mobile:mobile, border:!mobile}">
          <!--        <v-alert v-if="errorSigCont" type="error" dense>Define a list of entries for significance contribution (max 100-->
          <!--          entries).-->
          <!--        </v-alert>-->
          <v-row justify="center">
            <v-col cols="4" md="12">
              <div>
                <v-container style="margin-top: 16px">
                  <v-row style="margin: 8px" justify="center">
                    <v-col class="flex_content_center">
                      <v-select label="ID Space" append-icon="mdi-menu-down"
                                :items="network1.indexOf('comorbidity') > -1 || network2.indexOf('comorbidity')> -1? [{value: 'ICD10', text: 'ICD10'}] : network_ids[networkType]"
                                v-model="network_id"
                                style="max-width: 210px; min-width: 210px" outlined dense filled hide-details
                      >
                        <template v-slot:append-outer>
                          <v-tooltip right>
                            <template v-slot:activator="{on, attrs}">
                              <v-icon v-bind="attrs" v-on="on">far fa-question-circle</v-icon>
                            </template>
                            <div style="width: 250px; text-align: justify">
                              TODO tooltip
                            </div>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <!--                  </v-col>-->
                  </v-row>
                  <v-row justify="center" justify-md="start">
                    <v-col cols="12" :class="{'flex_content_center':mobile}">
                      <v-textarea label="Node IDs"
                                  v-model="nodes"
                                  :class="{ 'ta_mobile':mobile }"
                                  no-resize
                                  filled
                                  placeholder="Enter your chosen IDs newline separated...">
                        <template v-slot:append>
                          <v-tooltip right>
                            <template v-slot:activator="{on, attrs}">
                              <v-icon style="top: -14px;right:-10px; margin-left: -21px" v-bind="attrs" v-on="on">far
                                fa-question-circle
                              </v-icon>
                            </template>
                            <div style="width: 250px; text-align: justify">
                              Manually add IDs newline separated.
                            </div>
                          </v-tooltip>
                        </template>
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
      </template>
      <div style="display: flex; margin:8px">
        <v-btn color="primary" @click="checkEvent" :disabled="!(network1 && network2 && network_id)"
               style="margin-left: auto; margin-right: auto; justify-self: center">
          Evaluate
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <template v-if="results">
        <div style="display: flex; justify-content: center">
          <v-subheader :class="{sh_mobile:mobile, sh:!mobile}">
            Results
          </v-subheader>
        </div>
        <v-container style="margin-top: 16px">
          <v-row justify="center" justify-md="start">
            <v-col cols="4" :class="{'flex_content_center':mobile}">
              <v-container>
                <v-row justify="center">
                  <span>
                  Local<v-icon v-show="!local_scores" right style="top:-2px">mdi-cog fa-spin</v-icon>
                    </span>
                </v-row>
                <v-row justify="center" v-if="local_scores">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th v-for="h of Object.keys(local_scores)" :key="h">
                          {{ h }}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="idx in Object.keys(local_scores.node)"
                          :key="'local'+idx">
                        <td>{{ Object.values(local_scores)[0][idx] }}</td>
                        <td>
                          {{ Object.values(local_scores)[1][idx].toExponential(3) }}
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="4" :class="{'flex_content_center':mobile}">
              <v-container>
                <v-row justify="center">
                  <span>
                  Cluster<v-icon v-show="!cluster_scores" right style="top:-2px">mdi-cog fa-spin</v-icon>
                    </span>
                </v-row>
                <v-row justify="center" v-if="cluster_scores">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th v-for="h of Object.keys(cluster_scores)" :key="h">
                          {{ h }}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="idx in Object.keys(Object.values(cluster_scores)[0])"
                          :key="'cluster'+idx">
                        <td>{{ Object.values(Object.values(cluster_scores)[0])[idx] }}</td>
                        <td>
                          {{ Object.values(Object.values(cluster_scores)[1])[idx].toExponential(3) }}
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="4" :class="{'flex_content_center':mobile}">
              <v-container>
                <v-row justify="center">
                  <span>
                  Global<v-icon v-show="!global_scores" right style="top:-2px">mdi-cog fa-spin</v-icon>
                    </span>
                </v-row>

                <v-row v-if="global_scores" justify="center">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th v-for="h of Object.keys(global_scores[global_score_measure])" :key="h">
                          {{ h }}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="idx in Object.keys(Object.values(global_scores[global_score_measure])[0])"
                          :key="'global'+idx">
                        <td>{{ Object.values(Object.values(global_scores[global_score_measure])[0])[idx] }}</td>
                        <td>
                          {{
                            Object.values(Object.values(global_scores[global_score_measure])[1])[idx].toExponential(3)
                          }}
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-select style="max-width: 210px; min-width: 210px" outlined dense filled hide-details
                            append-icon="mdi-menu-down"
                            :items="Object.keys(global_scores).map(k=>{return{value:k, text:k}})"
                            v-model="global_score_measure" label="Measure"></v-select>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-row justify="center" style="margin-bottom: 16px">
            <v-col cols="10" class="flex_content_center">
              <div style="width: 100%" v-if="network">
                <drugst-one
                    id='drugstone-component-id'
                    :groups='getGroups()'
                    :config='getConfig()'
                    :network='getNetwork()'>
                </drugst-one>
              </div>
            </v-col>
          </v-row>
        </v-container>

      </template>
    </v-sheet>
    <v-snackbar v-model="notification.show" :multi-line="true" :timeout="notification.timeout"
                color="warning" dark>
      {{ notification.message }}
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: "Configuration",

  props: {
    mobile: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      notification: {
        show: false,
        message: "",
        timeout: 5000,
      },
      clusterHeaders: [
        {text: 'Target ID', align: 'start', sortable: true, value: 'id'},
        {text: 'Cluster', align: 'start', sortable: true, value: 'cluster'},
        {text: 'Action', align: 'end', sortable: false, width: "50px", value: 'action'}
      ],
      networkTypes: [{value: 'diseasome', text: 'Diseasome'}, {
        value: 'drugome',
        text: 'Drugome'
      }, {value: 'drug-disease', text: 'Drug-Disease Network'}],
      networks: {
        'diseasome': [{value: 'disease_symptom', text: 'Symptom based'}, {
          value: 'disease_drug',
          text: 'Drug based'
        }, {value: 'disease_comorbidity', text: 'Comorbidity based'}, {
          value: 'disease_gene',
          text: 'Gene based'
        }, {value: 'disease_variant', text: 'Variant based'}],
        'drugome': [{value: 'drug_disease', text: 'Disease based'}, {
          value: 'drug_indication',
          text: 'Indication based'
        }]
      },
      network1: undefined,
      network2: undefined,
      networkType: undefined,
      network_ids: {
        'diseasome': [{value: 'MONDO', text: 'MONDO'}, {value: 'ICD10', text: 'ICD10'}],
        'drugome': [{value: 'DrugBank', text: 'DrugBank'}]
      },
      network_id: undefined,
      nodes: "",
      results: true,
      local_scores: undefined,
      global_score_measure: "empirical_p_values",
      cluster_scores: undefined,
      global_scores: undefined,
      groupConfig: {
        "nodeGroups": {
          "C1": {
            "type": "cluster 1",
            "color": "#4da300",
            "font": {"color": "#f0f0f0"},
            "groupName": "Cluster 1",
            "shape": "circle"
          },
          "C2": {
            "type": "cluster 2",
            "color": "#0029a3",
            "font": {"color": "#f0f0f0"},
            "groupName": "Cluster 2",
            "shape": "circle"
          }
        },
        "edgeGroups": {
          "default": {"color": "#000000", "groupName": "default edge"}
        }
      },
      networkConfig: {
        "title": "Cluster visualization",
        "nodeShadow": true,
        "edgeShadow": true,
        "autofillEdges": false,
        "physicsOn": true,
        "showSidebar": false,
        "showNetworkMenu": "right",
        "showNetworkMenuButtonExpression": false,
        "showNetworkMenuButtonAdjacentDrugs": false,
        "showNetworkMenuButtonAdjacentDisordersProteins": false,
        "showNetworkMenuButtonAdjacentDisordersDrugs": false
      },
      network: undefined
    }
  },

  created() {
    // this.$router.push("/configure")
  },

  methods: {

    idsToList: function (ids) {
      return ids.split(/\n/).filter(id => id.length > 0)
    },


    setNotification: function (message, timeout) {
      if (timeout)
        this.notification.timeout = timeout
      if (message)
        this.notification.message = message
      this.notification.show = true
    }
    ,

    getBackgroundModelItems: function () {
      let items = this.backgroundModels;
      if (this.mode !== 'network')
        items = items.filter(e => e.value !== 'network')
      if (this.mode === 'cluster')
        items = items.filter(e => e.value === 'complete')
      if (this.mode === 'network')
        items = items.filter(e => e.value === 'network')
      return items
    },

    getGroups: function () {
      return JSON.stringify(this.groupConfig)
    },

    getConfig: function () {
      return JSON.stringify(this.networkConfig)
    },

    getNetwork: function () {
      return JSON.stringify(this.network)
    },

    scrollDown: function (bool) {
      if (bool)
        setTimeout(() => {
          window.scrollTo({top: 5000, behavior: 'smooth'})
        }, 200)
    },

    convertNetworks: function (networks) {
      let nodes = []
      let edges = []
      for (let nw_idx in networks) {
        let nw = networks[nw_idx]
        let node_map = nw.nodes
        nodes = nodes.concat(Object.values(nw.nodes).map(n => {
          let idx = parseInt(nw_idx)+1
          return {id: n + "_c"+nw_idx, label: n + "(C"+idx+")", group: 'C'+idx}
        }))
        edges = edges.concat(nw.edges.map(e => {
          return {from: node_map[e[0]]+"_c"+nw_idx, to: node_map[e[1]]+"_c"+nw_idx}
        }))
        this.network = {nodes: nodes, edges: edges}
      }
    },

    checkEvent: async function () {
      let params = {
        'network_type1': this.network1,
        'network_type2': this.network2,
        'id_space': this.network_id,
        'nodes': []
      }
      if (this.nodes.length > 0)
        params.nodes = this.nodes.split("\n").map(e => e.trim()).filter(e => e.length > 0)
      this.results = false

      this.local_scores = undefined
      this.cluster_scores = undefined
      this.global_scores = undefined

      this.results = true
      await this.$http.get_networks(params).then(response => {
        this.convertNetworks(response)
      })

      await this.$http.get_local_scores(params).then(response => {
        this.local_scores = response
        console.log(this.local_scores)
        this.scrollDown(true)
      })
      await this.$http.get_global_scores(params).then(response => {
        this.global_scores = response
        this.global_score_measure = Object.keys(response)[0]
        console.log(response)
        this.scrollDown(true)
      })
      this.$http.get_cluster_scores(params).then(response => {
        this.cluster_scores = response
        console.log(response)
        this.scrollDown(true)
      })
      this.scrollDown(true)
    }
  },
}
</script>

<style scoped lang="sass">

.v-subheader
  margin: 8px

.flex
  display: flex

.flex_self_center
  display: flex
  justify-self: center
  margin-left: auto !important
  margin-right: auto !important

.flex_self_start
  justify-self: flex-start
  margin-right: auto !important
  margin-left: 0 !important

.flex_self_start_alt
  justify-self: flex-start
  margin-right: auto !important
  margin-left: auto !important

.flex_self_end
  justify-self: flex-end
  margin-right: 0 !important
  margin-left: auto !important

.flex_self_end_alt
  justify-self: flex-end
  margin-right: auto !important
  margin-left: auto !important

.flex_content_center
  justify-content: center
  display: flex

.example_div_width
  width: 100%
  display: flex
  margin: 4px

.sh_mobile
  font-size: 1.2rem

.ta_mobile
  padding: 0

.ta_not_mobile
  max-width: 40vw
  margin-left: auto
  margin-right: 0
  justify-self: flex-end

.sh
  font-size: 1.5rem
  margin-left: 64px
  margin-right: 64px

.margin_normal
  padding-left: 64px
  padding-right: 64px

.border
  padding-right: 64px
  padding-left: 64px

.border_mobile
  padding-right: 16px
  padding-left: 16px

.margin_mobile
  padding-left: 8px
  padding-right: 8px
</style>
