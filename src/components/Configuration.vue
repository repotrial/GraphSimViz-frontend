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
                  <b>Local empirical P-values</b>
                    <v-icon v-if="!local_scores" right style="top:-2px">mdi-cog fa-spin</v-icon>
                    <v-tooltip right>
                    <template v-slot:activator="{on, attrs}">
                    <v-btn @click="downloadLocal()" v-show="local_scores" icon right small v-bind="attrs" v-on="on"><v-icon
                        style="top:-2px">mdi-download</v-icon></v-btn>
                    </template>
                    <div style="width: 250px; text-align: justify">
                      Click here to download the local P-value table in .tsv format.
                    </div>
                  </v-tooltip>
                    </span>
                  </v-row>
                  <v-row justify="center" v-if="local_scores">
                    <v-simple-table dense style="margin-top: 8px;" fixed-header height="280px">
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th>
                            Label
                          </th>
                          <th>
                            {{ networkType_loaded === 'diseasome' ? 'Disease ID' : 'Drug ID' }}
                          </th>
                          <th>
                            <span style="padding-left: 10px">P-value</span>
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="idx in local_scores.order"
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
                  Cluster-level P-value{{ mwu ? ' (MWU)' : '' }}</b><v-icon v-if="!cluster_scores" right
                                                                            style="top:-2px">mdi-cog fa-spin</v-icon>
<!--                    <v-btn-->
<!--                      @click="downloadCluster(mwu)" v-else icon right small>-->
<!--                    <v-icon-->
<!--                      style="top:-2px">mdi-download</v-icon></v-btn>-->


                    <v-tooltip right>
                      <template v-slot:activator="{on, attrs}">
                        <v-btn @click="downloadCluster(mwu)" v-show="cluster_scores" icon right small v-bind="attrs" v-on="on"><v-icon
                            style="top:-2px">mdi-download</v-icon></v-btn>
                      </template>
                      <div style="width: 250px; text-align: justify">
                        Click here to download the cluster-level P-value table in .tsv format.
                      </div>
                    </v-tooltip>
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
                  Global empirical P-value{{ mwu ? ' (MWU)' : '' }}</b>
                    <v-icon v-if="!global_scores" right style="top:-2px">mdi-cog fa-spin</v-icon>
<!--                    <v-btn-->
<!--                      @click="downloadGlobal(mwu)" v-else icon right small><v-icon-->
<!--                      style="top:-2px">mdi-download</v-icon></v-btn>-->


                     <v-tooltip right>
                    <template v-slot:activator="{on, attrs}">
                    <v-btn @click="downloadGlobal(mwu)" v-show="global_scores" icon right small v-bind="attrs" v-on="on"><v-icon
                        style="top:-2px">mdi-download</v-icon></v-btn>
                    </template>
                    <div style="width: 250px; text-align: justify">
                      Click here to download the global P-value in .tsv format.
                    </div>
                  </v-tooltip>


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
                    <v-select v-if="global_scores" dense
                              :items="Object.values(Object.values(global_scores)[0]).map(k=>{return{text: map_names(k), value:k}})"
                              style="max-width: 250px" append-icon="mdi-menu-down" v-model="ged_variant">
                      <template v-slot:label>
                        <v-tooltip right>
                          <template v-slot:activator="{on, attrs}">
                            GED Variant
                            <v-icon v-bind="attrs" v-on="on" small right style="top: -2px">far fa-question-circle
                            </v-icon>
                          </template>
                          <div style="width: 300px; text-align: justify">
                            For Diseasome and Drugome comparisons three graph edit distance variants can be
                            displayed:<br>
                            <b>Uniform edit costs:</b> Score normalized<br>
                            <b>Rank-based edit costs:</b> Rank normalized<br>
                            <b>Weight-based edit costs:</b> Topology only
                          </div>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </div>
      <div style="width: 100%">
        <v-container :class="{border_mobile:mobile, border:!mobile}">
          <v-row justify-content="center">

            <v-col cols="12" lg="4" :class="{'flex_content_center':mobile}">
              <div style="display: flex; justify-content: center">
                <v-subheader :class="{sh_mobile:mobile, sh:!mobile}" style="margin-bottom: 0; padding-bottom: 0; wrap">
                  1. Network
                </v-subheader>
              </div>
              <v-container style="padding-top: 16px">
                <v-row justify="start" justify-lg="center">
                  <v-col class="flex_content_center">
                    <v-radio-group v-model="networkType" @change="unsetConfig(2)" dense
                                   style="margin-top: 0; padding-top: 0">
                      <v-radio v-for="t of networkTypes" :key="'nw_'+t.value" :label="t.text" :value="t.value">
                      </v-radio>
                      <template v-slot:label>
                        <v-tooltip right>
                          <template v-slot:activator="{on, attrs}">
                            General network
                            <v-icon style="top: -2px" small right v-bind="attrs" v-on="on">far fa-question-circle
                            </v-icon>
                          </template>
                          <div style="width: 350px; text-align: justify">
                            Select the general network type to be compared:<br>
                            <b>Diseasome:</b> Disease-Disease networks<br>
                            <b>Drugome:</b> Drug-Drug networks<br>
                            <b>Drug-Disease Network</b>
                          </div>
                        </v-tooltip>
                      </template>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-divider vertical style="margin-top: 16px; margin-bottom: 16px"></v-divider>
            <v-col cols="12" lg="8" :class="{'flex_content_center':mobile}">
              <div style="display: flex; justify-content: center">
                <v-subheader :class="{sh_mobile:mobile, sh:!mobile}" style="margin-bottom: 0; padding-bottom: 0">2.
                  Edges
                </v-subheader>
              </div>
              <v-container style="padding-top: 16px">
                <v-row justify="center" justify-lg="start">
                  <v-col cols="12" md="5" lg="5" class="flex_content_center">
                    <v-radio-group v-model="network1" @change="unsetConfig(3)" dense
                                   style="margin-top: 0; padding-top: 0">
                      <v-radio
                          v-for="t of networks[networkType].filter(e=> networks[networkType].length >2 || (network2 == null || e.value !== network2))"
                          :key="'nw1_'+t.value" :label="t.text" :value="t.value"
                          :disabled="network2 && t.value === network2">
                      </v-radio>
                      <template v-slot:label>
                        <v-tooltip right>
                          <template v-slot:activator="{on, attrs}">
                            Network 1
                            <v-icon style="top: -2px" small right v-bind="attrs" v-on="on">far fa-question-circle
                            </v-icon>
                          </template>
                          <div style="width: 250px; text-align: justify">
                            Select an entity on which network 1 will be constructed on. An edge will be generated if two
                            nodes in the main network share a connection to an entry of the selected type.
                          </div>
                        </v-tooltip>
                      </template>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="1" class="flex_content_center">
                    <v-divider vertical></v-divider>
                  </v-col>
                  <v-col cols="12" md="5" lg="5" class="flex_content_center">
                    <v-radio-group v-model="network2" @change="unsetConfig(3)" dense
                                   style="margin-top: 0; padding-top: 0">
                      <v-radio
                          v-for="t of networks[networkType].filter(e=> networks[networkType].length >2 || (network1 == null || e.value !== network1))"
                          :key="'nw2_'+t.value" :label="t.text" :value="t.value"
                          :disabled="network1 && t.value === network1">
                      </v-radio>
                      <template v-slot:label>
                        <v-tooltip right>
                          <template v-slot:activator="{on, attrs}">
                            Network 2
                            <v-icon style="top: -2px" small right v-bind="attrs" v-on="on">far fa-question-circle
                            </v-icon>
                          </template>
                          <div style="width: 250px; text-align: justify">
                            Select an entity on which network 2 will be constructed on. An edge will be generated if two
                            nodes in the main network share a connection to an entry of the selected type.
                          </div>
                        </v-tooltip>
                      </template>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

          </v-row>
        </v-container>
        <v-divider style="margin-left: 32px; margin-right: 32px"></v-divider>

        <template>
          <div style="display: flex; justify-content: center">
            <v-subheader :class="{sh_mobile:mobile, sh:!mobile}">3. Nodes</v-subheader>
          </div>
          <v-container :class="{border_mobile:mobile, border:!mobile}">
            <v-row justify="center">
              <v-col cols=12>
                <div>
                  <v-container>
                    <v-row>
                      <v-col cols=12 md=8>
                        <v-select
                            append-icon="mdi-menu-down"
                            :items="(network1 && network2 && (network1.indexOf('comorbidity') > -1 || network2.indexOf('comorbidity')> -1))? [{value: 'ICD10', text: 'ICD10'}] : network_ids[networkType]"
                            v-model="network_id" @change="unsetConfig(4)"
                            style="max-width: 210px; min-width: 210px" dense hide-details
                            :disabled="networkType ==='drugome'"
                        >
                          <template v-slot:label>
                            <v-tooltip right>
                              <template v-slot:activator="{on, attrs}">
                                {{ (networkType === 'drugome' ? 'Drug ' : 'Disease ') + 'ID Space' }}
                                <v-icon v-bind="attrs" v-on="on" small right style="top: -2px">far fa-question-circle
                                </v-icon>
                              </template>
                              <div style="width: 250px; text-align: justify">
                                {{
                                  networkType === 'drugome' ? 'Drug IDs have to be given in DrugBank space.' : 'Select the ID space in which you want to define entries.'
                                }}
                              </div>
                            </v-tooltip>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col cols=12 md=4 class="flex_content_end">
                        <v-btn outlined :disabled="!network_id"
                               @click="loadExample(network_id)">
                          <v-icon left>mdi-download-multiple</v-icon>
                          Example
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row justify="center" justify-md="start">
                      <v-col cols="12" md=12 :class="{'flex_content_center':mobile}">
                        <v-textarea
                            v-model="nodes"
                            :class="{ 'ta_mobile':mobile }"
                            no-resize
                            :disabled="!network_id"
                            outlined
                            label="Node IDs"
                            hint="Please enter a newline separated list of node ids in the selected ID space or use the
                                example button to add some examples. For MONDO and DrugBank IDs entries can have the
                                prefix 'mondo.' or 'drugbank.' but this is not necessary."
                            placeholder="Enter your chosen IDs newline separated...">
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <v-divider style="margin-left: 32px; margin-right: 32px"></v-divider>

        <template>
          <div style="display: flex; justify-content: center">
            <v-subheader :class="{sh_mobile:mobile, sh:!mobile}" style="margin-bottom: 0; padding-bottom: 0">4.
              Optional
            </v-subheader>
          </div>
          <v-container :class="{border_mobile:mobile, border:!mobile}">
            <v-row justify="center">
              <v-col cols="4" md="12" style="padding-top: 0">
                <div>
                  <v-container>
                    <v-row>
                      <v-col cols="8" style="padding-top: 0">
                        <v-switch style="margin-top: 0;" v-model="mwu">
                          <template v-slot:label>
                            <v-tooltip right>
                              <template v-slot:activator="{on, attrs}">
                                Use MWU
                                <v-icon v-bind="attrs" v-on="on" small right style="top: -2px">far fa-question-circle
                                </v-icon>
                              </template>
                              <div style="width: 250px; text-align: justify">
                                When enabled, the Mann-Whitney U test ist used to calculate cluster and global p-values.
                              </div>
                            </v-tooltip>
                          </template>
                        </v-switch>
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
          value: 'drug_target',
          text: 'Indication based'
        }], 'drug-disease': [{text: 'Gene based', value: 'disease_gene'}, {text: 'Drug based', value: 'disease_drug'}]
      },
      network1: "disease_drug",
      network2: "disease_gene",
      networkType: "diseasome",
      networkType_loaded: 'diseaseome',
      network_ids: {
        'diseasome': [{value: 'MONDO', text: 'MONDO'}, {value: 'ICD10', text: 'ICD10'}],
        'drugome': [{value: 'DrugBank', text: 'DrugBank'}],
        'drug-disease': [{value: 'MONDO', text: 'MONDO'}, {value: 'ICD10', text: 'ICD10'}]
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
        "title": "Similarity Visualization",
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
    },

    downloadLocal: function () {
      let text = "#" + (this.networkType_loaded === 'diseasome' ? 'Disease ID' : 'Drug ID') + "\tLocal empirical P-value" + "\n";
      let dlName = "local_empirical_p-values.tsv"
      Object.values(this.local_scores.order).forEach(nid => text += this.local_scores.node[nid] + "\t" + this.local_scores.local_p_value[nid] + "\n")
      this.execDownload(dlName, text)
    },

    downloadCluster: function (mwu) {
      let text = "#" + (this.networkType_loaded === 'diseasome' ? 'Disease ID' : 'Drug ID') + "\tCluster-level P-value" + "\n";
      let dlName = "cluster-level" + (mwu ? '-mwu' : '') + "_p-values.tsv"
      Object.keys(this.cluster_scores.p_value).forEach(idx => text += this.cluster_scores.distance_type[idx] + "\t" + this.cluster_scores.p_value[idx] + "\n")
      this.execDownload(dlName, text)
    },

    downloadGlobal: function (mwu) {
      let text = "#" + (this.networkType_loaded === 'diseasome' ? 'Disease ID' : 'Drug ID') + "\tGlobal empirical P-value" + "\n";
      let dlName = "global_empirical" + (mwu ? '-mwu' : '') + "_p-values.tsv"
      Object.keys(this.global_scores.p_value).forEach(idx => text += this.global_scores.distance_type[idx] + "\t" + this.global_scores.p_value[idx] + "\n")
      this.execDownload(dlName, text)
    },

    execDownload: function (name, content) {
      let dl = document.createElement('a')
      dl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
      dl.setAttribute('download', name)
      dl.style.direction = 'none'
      document.body.appendChild(dl)
      dl.click()
      document.body.removeChild(dl)
    },

    checkEvent: async function (loaded) {
      let params = {
        'network_type1': this.network1,
        'network_type2': this.network2,
        'id_space': this.network_id,
        'network': this.networkType,
        'nodes': [],
        'mwu': this.mwu
      }
      if (this.nodes.length > 0)
        params.nodes = this.nodes.split("\n").map(e => e.trim()).filter(e => e.length > 0)
      if (['DrugBank', 'MONDO'].indexOf(this.network_id) > -1) {
        params.nodes = params.nodes.map(n => {
          if (n.startsWith(this.network_id.toLowerCase()))
            return n
          return this.network_id.toLowerCase() + "." + n
        })
      }
      this.results = false

      this.local_scores = undefined
      this.cluster_scores = undefined
      this.global_scores = undefined
      this.network = undefined

      this.results = true

      this.request_results(params, undefined, loaded)

    },

    unsetConfig: function (start_step) {
      if (start_step <= 2) {
        if (this.networkType === 'drug-disease') {
          this.network1 = 'disease_gene'
          this.network2 = 'disease_drug'
        } else if (this.networkType === 'drugome') {
          this.network1 = 'drug_disease'
          this.network2 = 'drug_target'
        } else {
          this.network1 = undefined
          this.network2 = undefined
        }
      }
      if (start_step <= 3) {
        if (this.networkType === 'drugome') {
          this.network_id = 'DrugBank'
        } else
          this.network_id = undefined
      }
      if (start_step <= 4) {
        this.nodes = ''
      }
    },

    request_results: function (params, networks, loaded) {
      this.$http.get_local_scores(params).then(response => {
        let names = {}
        let nid_order = {}
        Object.keys(response.node).forEach(nid => {
          let idx = params.nodes.indexOf(response.node[nid])
          if (idx > -1)
            nid_order[idx] = nid
        })
        nid_order = Object.values(nid_order)
        nid_order.forEach(nid => {
          names[nid] = 'D' + (Object.keys(names).length + 1)
        })
        response.names = names
        response.order = nid_order
        this.networkType_loaded = this.networkType
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
      this.ged_variant = params.network === 'drug-disease' ? 'topology_only' : 'normalized_scores';
      this.$http.get_global_scores(params).then(response => {
        let global_score_measure = this.mwu ? 'mwu_p_values' : 'empirical_p_values'
        this.global_scores = response[global_score_measure]


      }).catch(err => console.error(err))
      this.request_cluster_values(params)
    },

    request_cluster_values: function (params) {
      this.$http.get_cluster_scores(params).then(response => {
        if (response.done || response.error) {
          this.cluster_scores = response.result
        } else {
          setTimeout(() => this.request_cluster_values(params), 5000)
        }

      }).catch(err => console.error(err))
    },


    loadExample: function (id_space) {
      switch (id_space) {
        case 'MONDO':
          this.nodes = 'mondo.0004975\nmondo.0000437\nmondo.0007739\nmondo.0005180\nmondo.0004976\nmondo.0020128\nmondo.0005301'
          break;
        case 'ICD10':
          this.nodes = 'G30\nF02\nG10\nF02.2\nG12.2\nG35'
          break;
        case 'DrugBank':
          this.nodes = 'drugbank.DB00960\n' +
              'drugbank.DB00746\n' +
              'drugbank.DB00158\n' +
              'drugbank.DB09061\n' +
              'drugbank.DB01017\n' +
              'drugbank.DB00176\n' +
              'drugbank.DB00850\n' +
              'drugbank.DB00683\n' +
              'drugbank.DB12052\n' +
              'drugbank.DB00502\n' +
              'drugbank.DB01065\n' +
              'drugbank.DB00679\n' +
              'drugbank.DB11094\n' +
              'drugbank.DB01212\n' +
              'drugbank.DB04115\n' +
              'drugbank.DB03128\n' +
              'drugbank.DB00674\n' +
              'drugbank.DB01618\n' +
              'drugbank.DB12110\n' +
              'drugbank.DB00715\n' +
              'drugbank.DB00681\n' +
              'drugbank.DB11672\n' +
              'drugbank.DB00981\n' +
              'drugbank.DB00328\n' +
              'drugbank.DB01043\n' +
              'drugbank.DB01050\n' +
              'drugbank.DB00834\n' +
              'drugbank.DB04815\n' +
              'drugbank.DB00656\n' +
              'drugbank.DB00382\n' +
              'drugbank.DB11473\n' +
              'drugbank.DB00115\n' +
              'drugbank.DB04864\n' +
              'drugbank.DB01356\n' +
              'drugbank.DB00323\n' +
              'drugbank.DB00975\n' +
              'drugbank.DB00014\n' +
              'drugbank.DB00934\n' +
              'drugbank.DB00206\n'
      }
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

.v-subheader
  white-space: nowrap


td
  border-style: hidden !important

</style>
