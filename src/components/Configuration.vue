<template>
  <div style="width: 100%;  padding: 16px">
    <div v-bind:class="{flex:!mobile}">
    </div>
    <v-sheet style="margin-top: 16px;">
      <div id="result-box"
           style="border:#858585 solid thin; border-radius: 16px; width: 90%; display: flex; align-self: center; margin-left: auto; margin-right: auto">
        <template v-if="results">
          <v-container style="margin-top: 16px" v-if="results">
            <v-row justify="center" style="margin-bottom: 16px">
              <v-col cols="12" class="flex_content_center" style="padding:0">
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
            <!--            <v-divider></v-divider>-->
            <v-row justify="center" justify-md="start">
              <v-col cols="6" :class="{'flex_content_center':mobile}">
                <v-container>
                  <v-row justify="center">
                  <span style="color: #858585">
                  <b>Local empirical P-value</b><v-icon v-show="!local_scores" right style="top:-2px">mdi-cog fa-spin</v-icon>
                    </span>
                  </v-row>
                  <v-row justify="center" v-if="local_scores">
                    <v-simple-table max-height="400px" dense style="margin-top: 8px">
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th>
                            Name
                          </th>
                          <th>
                            Node
                          </th>
                          <th>
                            <span style="padding-left: 10px">P-value</span>
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="idx in Object.keys(local_scores.node)"
                            :key="'local'+idx">
                          <td>{{ local_scores.names[idx] }}</td>
                          <td>{{ local_scores.node[idx] }}</td>
                          <td>
                            <v-chip dark small :color="get_significance_color(local_scores.local_p_value[idx])">
                              {{ local_scores.local_p_value[idx].toExponential(3) }}
                            </v-chip>
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
                  <span style="color: #858585">
                  <b>
                  Cluster-level empirical P-value</b><v-icon v-show="!cluster_scores" right
                                                             style="top:-2px">mdi-cog fa-spin</v-icon>
                    </span>
                  </v-row>
                  <v-row justify="center" v-if="cluster_scores">
                    <v-chip dark small style="margin-top: 8px"
                            :color="get_significance_color(Object.values(Object.values(cluster_scores)[1])[Object.values(Object.values(cluster_scores)[0]).indexOf(ged_variant)])">
                      {{
                        Object.values(Object.values(cluster_scores)[1])[Object.values(Object.values(cluster_scores)[0]).indexOf(ged_variant)].toExponential(3)
                      }}
                    </v-chip>
                  </v-row>
                  <v-row justify="center" style="margin-top: 64px">
                  <span style="color: #858585">
                  <b>
                  Global empirical P-value</b><v-icon v-show="!global_scores" right
                                                      style="top:-2px">mdi-cog fa-spin</v-icon>
                    </span>
                  </v-row>

                  <v-row v-if="global_scores" justify="center">
                    <v-chip dark small style="margin-top: 8px"
                            :color="get_significance_color(Object.values(Object.values(global_scores)[1])[Object.values(Object.values(global_scores)[0]).indexOf(ged_variant)])">
                      {{
                        Object.values(Object.values(global_scores)[1])[Object.values(Object.values(global_scores)[0]).indexOf(ged_variant)].toExponential(3)
                      }}
                    </v-chip>
                  </v-row>
                  <v-row justify="center" style="margin-top: 64px">
                    <v-select v-if="global_scores"
                              label="GED Variant" dense
                              :items="Object.values(Object.values(global_scores)[0]).map(k=>{return{text: map_names(k), value:k}})"
                              style="max-width: 250px" append-icon="mdi-menu-down" v-model="ged_variant">

                    </v-select>
                  </v-row>
                </v-container>
              </v-col>
              <!--              <v-col cols="4" :class="{'flex_content_center':mobile}">-->
              <!--               -->
              <!--              </v-col>-->
            </v-row>
          </v-container>

        </template>
      </div>
      <div style="width: 100%">
        <v-container :class="{border_mobile:mobile, border:!mobile}">
          <v-row justify="center">

            <v-col cols="6" lg="6" :class="{'flex_content_center':mobile}">
              <div style="display: flex; justify-content: center">
                <v-subheader :class="{sh_mobile:mobile, sh:!mobile}">
                  1. Network type
                </v-subheader>
              </div>
              <v-container style="padding-top: 16px">
                <v-row justify="center" justify-lg="start">
                  <v-col cols="12" md="6" lg="12" class="flex_content_center">
                    <v-radio-group v-model="networkType">
                      <v-radio v-for="t of networkTypes" :key="'nw_'+t.value" :label="t.text" :value="t.value">
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-divider vertical style="margin-top: 16px; margin-bottom: 16px" v-if="networkType && networkType !== 'drug-disease'"></v-divider>
            <v-col cols="6" lg="6" :class="{'flex_content_center':mobile}"
                   v-if="networkType && networkType !== 'drug-disease'">
              <div style="display: flex; justify-content: center">
                <v-subheader :class="{sh_mobile:mobile, sh:!mobile}">2. Specify Network Sources</v-subheader>
              </div>
              <v-container style="padding-top: 16px">
                <v-row justify="center" justify-lg="start">
                  <v-col cols="12" md="5" lg="5" class="flex_content_center">
                    <v-select label="Network 1"
                              :items="networks[networkType].filter(e=> network2 == null || e.value !== network2)"
                              v-model="network1"
                              append-icon="mdi-menu-down"
                              style="max-width: 210px; min-width: 210px" dense hide-details>
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
                  <v-col cols="1" class="flex_content_center">
                    <v-divider vertical></v-divider>
                  </v-col>
                  <v-col cols="12" md="5" lg="5" class="flex_content_center">
                    <v-select label="Network 2"
                              :items="networks[networkType].filter(e=> network1 == null || e.value !== network1)"
                              v-model="network2"
                              append-icon="mdi-menu-down"
                              style="max-width: 210px; min-width: 210px" dense hide-details>
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
        <v-divider style="margin-left: 32px; margin-right: 32px"></v-divider>

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
                  <v-container>
                    <v-row>
                      <v-col cols="8">
                        <v-select label="ID Space" append-icon="mdi-menu-down"
                                  :items="network1.indexOf('comorbidity') > -1 || network2.indexOf('comorbidity')> -1? [{value: 'ICD10', text: 'ICD10'}] : network_ids[networkType]"
                                  v-model="network_id"
                                  style="max-width: 210px; min-width: 210px" dense hide-details
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
                      <v-col cols=4 class="flex_content_end">
                        <v-btn outlined
                               @click="nodes = 'mondo.0004975\nmondo.0000437\nmondo.0007739\nmondo.0005180\nmondo.0004976\nmondo.0020128\nmondo.0005301'">
                          <v-icon left>mdi-download-multiple</v-icon>
                          Example
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row justify="center" justify-md="start">
                      <v-col cols="12" :class="{'flex_content_center':mobile}">
                        <v-textarea label="Node IDs"
                                    v-model="nodes"
                                    :class="{ 'ta_mobile':mobile }"
                                    no-resize
                                    outlined
                                    placeholder="Enter your chosen IDs newline separated...">
                          <!--                        <template v-slot:append>-->
                          <!--                          <v-tooltip right>-->
                          <!--                            <template v-slot:activator="{on, attrs}">-->
                          <!--                              <v-icon style="top: -14px;right:-10px; margin-left: -21px" v-bind="attrs" v-on="on">far-->
                          <!--                                fa-question-circle-->
                          <!--                              </v-icon>-->
                          <!--                            </template>-->
                          <!--                            <div style="width: 250px; text-align: justify">-->
                          <!--                              Manually add IDs newline separated.-->
                          <!--                            </div>-->
                          <!--                          </v-tooltip>-->
                          <!--                        </template>-->
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-divider style="margin-left: 32px; margin-right: 32px"></v-divider>
        </template>
        <div style="display: flex; margin:8px">
          <v-btn color="primary" @click="checkEvent(true)" :disabled="!(network1 && network2 && network_id)"
                 style="margin-left: auto; margin-right: auto; justify-self: center">
            Visualize
            <v-icon right>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
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
      network1: "disease_drug",
      network2: "disease_gene",
      networkType: "diseasome",
      network_ids: {
        'diseasome': [{value: 'MONDO', text: 'MONDO'}, {value: 'ICD10', text: 'ICD10'}],
        'drugome': [{value: 'DrugBank', text: 'DrugBank'}]
      },
      network_id: 'MONDO',
      nodes: "mondo.0004975\n" +
          "mondo.0000437\n" +
          "mondo.0007739\n" +
          "mondo.0005180\n" +
          "mondo.0004976\n" +
          "mondo.0020128\n" +
          "mondo.0005301",
      results: false,
      local_scores: undefined,
      cluster_scores: undefined,
      global_scores: undefined,
      ged_variant: 'normalized_scores',
      groupConfig: {
        "nodeGroups": {
          "****": {
            "type": 'node',
            "color": "#ffbd8e",
            "font": {"color": "#f0f0f0"},
            "groupName": "<= 0.0001",
            "shape": "circle"
          },
          "***": {
            "type": 'node',
            "color": "#fac1c0",
            "font": {"color": "#f0f0f0"},
            "groupName": "<= 0.001",
            "shape": "circle"
          },
          "**": {
            "type": 'node',
            "color": "#e08ba5",
            "font": {"color": "#f0f0f0"},
            "groupName": "<= 0.01",
            "shape": "circle"
          },
          "*": {
            "type": 'node',
            "color": "#712081",
            "font": {"color": "#f0f0f0"},
            "groupName": "<= 0.05",
            "shape": "circle"
          },
          "#": {
            "type": 'node',
            "color": "#2d105f",
            "font": {"color": "#f0f0f0"},
            "groupName": "non-significant",
            "shape": "circle"
          },
          "missing": {
            "type": 'node',
            "color": "#000000",
            "font": {"color": "#000000"},
            "groupName": "N/A",
            "shape": "triangle"
          },
        },
        "edgeGroups": {
          "conserved": {"color": "#000000", "groupName": "In both networks"},
          "non-conserved": {"color": "#000000", "groupName": "In one network", "dashes": [2, 4]},
        }
      },
      networkConfig: {
        "title": "Cluster Similarity Visualization",
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
      name_map: {
        'normalized_scores': 'Uniform edit costs',
        'normalized_ranks': 'Rank-based edit costs',
        'topology_only': 'Weight-based edit costs'
      },
      network: undefined,
      mwu: false,
    }
  },

  created() {
    // this.$router.push("/configure")
    this.checkEvent(false)
  },

  methods: {

    getGroups: function () {
      return JSON.stringify(this.groupConfig)
    },

    getConfig: function () {
      return JSON.stringify(this.networkConfig)
    },

    getNetwork: function () {
      return JSON.stringify(this.network)
    },

    scrollUp: function (bool) {
      if (bool)
        setTimeout(() => {
          window.scrollTo({top: document.getElementById('result-box').offsetTop, behavior: 'smooth'})
        }, 100)
    },

    map_names: function (key) {
      if (this.name_map[key])
        return this.name_map[key]
      return key

    },

    get_significance_group: function (p_value) {
      let group = '#'
      if (p_value <= 0.0001) {
        group = '****'
      } else if (p_value <= 0.001) {
        group = '***'
      } else if (p_value <= 0.01) {
        group = '**'
      } else if (p_value <= 0.05) {
        group = '*'
      }
      return group
    },

    get_significance_color: function (p_value) {
      let group = this.get_significance_group(p_value)
      return this.groupConfig.nodeGroups[group].color
    },

    convertNetworks: function (input, networks) {
      let edge_map = {}
      let node_map = {}
      input.nodes.forEach(n => {
        node_map[n] = {id: n, label: n, group: 'missing'}
      })
      let scores = this.local_scores
      Object.keys(scores.node).forEach(nid => {
        let n = scores.node[nid]
        node_map[n].group = this.get_significance_group(scores.local_p_value[nid])
        node_map[n].label = scores.names[nid]
      })

      for (let nw_idx in networks) {
        let nw = networks[nw_idx]
        let node_map = nw.nodes
        let edges = nw.edges.map(e => {
          let n1 = node_map[e[0]]
          let n2 = node_map[e[1]]
          if (n1 < n2)
            return {from: n1, to: n2, group: 'non-conserved'}
          return {from: n2, to: n1, group: 'non-conserved'}
        })
        edges.forEach(e => {
          let key = e.from + "_" + e.to
          if (edge_map[key]) {
            edge_map[key].group = 'conserved'
            delete edge_map[key].label
          } else {
            edge_map[key] = e
            e.label = (nw_idx === 0 ? input.network_type1 : input.network_type2).split('_')[1] + "-based"
          }
        })
      }

      this.network = {nodes: Object.values(node_map), edges: Object.values(edge_map)}
      console.log(this.network)
    },

    load_neighbors: async function () {
      let params = {
        'network_type1': this.network1,
        'network_type2': this.network2,
        'id_space': this.network_id,
        'nodes': []
      }
      if (this.nodes.length > 0)
        params.nodes = this.nodes.split("\n").map(e => e.trim()).filter(e => e.length > 0)
      this.results = false


      this.results = true
      this.$http.get_fist_neighbor_networks(params).then(response => {
        console.log(response)
        let new_nodes = []

        response.forEach(nw => new_nodes = new_nodes.concat(Object.values(nw.nodes)))
        let params = {
          'network_type1': this.network1,
          'network_type2': this.network2,
          'id_space': this.network_id,
          'nodes': new_nodes
        }
        this.request_results(params, response)
        // this.convertNetworks(params, response)
      }).catch(err => console.error(err))
    },

    checkEvent: async function (loaded) {
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
      this.network = undefined

      this.results = true

      this.request_results(params, undefined, loaded)

    },

    request_results: function (params, networks, loaded) {
      this.$http.get_local_scores(params).then(response => {

        let names = {}
        Object.keys(response.node).forEach(nid => {
          names[nid] = 'D' + (Object.keys(names).length + 1)
        })
        response.names = names
        this.local_scores = response
        if (networks) {
          this.convertNetworks(params, networks)
        } else {
          this.$http.get_networks(params).then(response => {
            this.convertNetworks(params, response)
          }).catch(console.error)
        }

        this.scrollUp(loaded)
      }).catch(err => console.error(err))

      this.$http.get_global_scores(params).then(response => {
        let global_score_measure = this.mwu ? 'mwu_p_values' : 'empirical_p_values'
        this.global_scores = response[global_score_measure]

      }).catch(err => console.error(err))
      this.request_cluster_values(params)
    },

    request_cluster_values: function (params) {
      this.$http.get_cluster_scores(params).then(response => {
        console.log("Requesting cluster values")
        if (response.done || response.error) {
          this.cluster_scores = response.result
        } else {
          setTimeout(() => this.request_cluster_values(params), 5000)
        }

      }).catch(err => console.error(err))
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

.flex_content_end
  justify-content: end
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


td
  border-style: hidden !important

</style>
