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
                            v-model="global_score_measure" label="Measure"></v-select>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-row justify="center" style="margin-bottom: 16px">
            <v-col cols="10" class="flex_content_center">
              <div style="width: 100%">
                <drugst-one
                    id='drugstone-component-id'
                    groups='{"nodeGroups":{"patient":{"type":"patient","color":"#000000","font":{"color":"#000000"},"groupName":"Patient","shape":"image","image":"https://static.thenounproject.com/png/22780-200.png"},"condition":{"type":"condition","color":"#000000","font":{"color":"#000000"},"groupName":"Condition","shape":"text"},"important":{"type":"gene","color":"#ff881f","font":{"color":"#000000"},"groupName":"Important Gene","shape":"star"},"gene":{"type":"gene","color":"#4da300","font":{"color":"#f0f0f0"},"groupName":"Gene","shape":"circle"},"foundDrug":{"type":"drug","color":"#F12590","font":{"color":"#000000"},"groupName":"Drug","shape":"diamond"}},"edgeGroups":{"genotype":{"color":"#000000","groupName":"Relevant Gene"},"has-condition":{"color":"#000000","groupName":"Has Condition","dashes":[2,2]},"default":{"color":"#000000","groupName":"default edge"},"ggi":{"color":"#000000","groupName":"Interaction","dashes":[3,2]}}}'
                    config='{"identifier":"symbol","title":"Cluster visualization","nodeShadow":true,"edgeShadow":false,"autofillEdges":false,"physicsOn":true,"showNetworkMenu":"right","showNetworkMenuButtonExpression":false,"showNetworkMenuButtonAdjacentDrugs":false,"showNetworkMenuButtonAdjacentDisordersProteins":false,"showNetworkMenuButtonAdjacentDisordersDrugs":false}'
                    network='{"nodes":[{"id":"patient-1","group":"patient","x":592,"y":446},{"id":"patient-2","group":"patient","x":235,"y":87},{"id":"patient-3","group":"patient","x":105,"y":369},{"id":"ATM","label":"ATM","group":"gene","x":289,"y":242},{"id":"BARD1","label":"BARD1","group":"gene","x":44,"y":250},{"id":"BRCA1","label":"BRCA1","group":"gene","x":466,"y":576},{"id":"BRCA2","label":"BRCA2","group":"gene","x":507,"y":285},{"id":"BRIP1","label":"BRIP1","group":"gene","x":54,"y":474},{"id":"CHEK2","label":"CHEK2","group":"gene","x":216,"y":590},{"id":"CDH1","label":"CDH1","group":"gene","x":320,"y":-57},{"id":"NF1","label":"NF1","group":"gene","x":481,"y":111},{"id":"NBN","label":"NBN","group":"gene","x":-57,"y":314},{"id":"PALB2","label":"PALB2","group":"gene","x":450,"y":190},{"id":"PTEN","label":"PTEN","group":"important","x":305,"y":494},{"id":"RAD51C","label":"RAD51C","group":"gene","x":182,"y":-90},{"id":"RAD51D","label":"RAD51D","group":"gene","x":368,"y":73},{"id":"STK11","label":"STK11","group":"gene","x":686,"y":330},{"id":"TP53","label":"TP53","group":"important","x":333,"y":316},{"id":"subtype-1","label":"Subtype 1","group":"condition","x":556,"y":171},{"id":"subtype-2","label":"Subtype 2","group":"condition","x":-87,"y":221}],"edges":[{"from":"BRCA1","to":"BRCA2","group":"ggi"},{"from":"ATM","to":"BARD1","group":"ggi"},{"from":"BRCA1","to":"CHEK2","group":"ggi"},{"from":"RAD51C","to":"RAD51D","group":"ggi"},{"from":"STK11","to":"TP53","group":"ggi"},{"from":"TP53","to":"PALB2","group":"ggi"},{"from":"TP53","to":"RAD51D","group":"ggi"},{"from":"TP53","to":"NF1","group":"ggi"},{"from":"TP53","to":"BRCA1","group":"ggi"},{"from":"TP53","to":"BRCA2","group":"ggi"},{"from":"PTEN","to":"BRCA1","group":"ggi"},{"from":"PTEN","to":"BRCA2","group":"ggi"},{"from":"TP53","to":"PTEN","group":"ggi"},{"from":"ATM","to":"PTEN","group":"ggi"},{"from":"CDH1","to":"RAD51D","group":"ggi"},{"from":"CDH1","to":"PALB2","group":"ggi"},{"from":"NBN","to":"BRIP1","group":"ggi"},{"from":"BRIP1","to":"PTEN","group":"ggi"},{"from":"patient-1","to":"BRCA1","group":"genotype"},{"from":"patient-1","to":"TP53","group":"genotype"},{"from":"patient-1","to":"BRCA2","group":"genotype"},{"from":"patient-1","to":"PTEN","group":"genotype"},{"from":"patient-2","to":"TP53","group":"genotype"},{"from":"patient-2","to":"NF1","group":"genotype"},{"from":"patient-2","to":"BARD1","group":"genotype"},{"from":"patient-3","to":"TP53","group":"genotype"},{"from":"patient-3","to":"PTEN","group":"genotype"},{"from":"patient-3","to":"NBN","group":"genotype"},{"from":"patient-1","to":"subtype-1","group":"has-condition"},{"from":"patient-2","to":"subtype-1","group":"has-condition"},{"from":"patient-3","to":"subtype-2","group":"has-condition"}]}'>
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
      local_scores: {
        "node": {
          "486": "mondo.0004975",
          "921": "mondo.0004976",
          "948": "mondo.0007739"
        },
        "local_p_value": {
          "486": 0.988011988011988,
          "921": 0.6553446553446554,
          "948": 0.0089910089910089
        }
      },
      global_score_measure: "empirical_p_values",
      // cluster_scores: {
      //   "distance_type": {
      //     "0": "normalized_ranks",
      //     "1": "normalized_scores",
      //     "2": "topology_only"
      //   },
      //   "p_value": {
      //     "0": 0.000999000999000999,
      //     "1": 0.025974025974025976,
      //     "2": 0.30569430569430567
      //   }
      // },
      cluster_scores: undefined,
      global_scores: {
        "empirical_p_values": {
          "distance_type": {
            "0": "topology_only",
            "1": "normalized_ranks",
            "2": "normalized_scores"
          },
          "p_value": {
            "0": 0.0009990009990009,
            "1": 0.0009990009990009,
            "2": 0.0009990009990009
          }
        },
        "mwu_p_values": {
          "distance_type": {
            "0": "topology_only",
            "1": "normalized_ranks",
            "2": "normalized_scores"
          },
          "p_value": {
            "0": 0.1576292089836642,
            "1": 0.0783986196799947,
            "2": 0.1385473637570792
          }
        }
      },
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

    scrollDown: function (bool) {
      if (bool)
        setTimeout(() => {
          window.scrollTo({top: 5000, behavior: 'smooth'})
        }, 200)
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
  getNetwork: async function () {
    if (this.networkFile) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          resolve(event.target.result.split('base64,')[1])
        });
        reader.readAsDataURL(this.networkFile)
      }).then(result => {
        return result
      })
    } else
      return undefined;
  }
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
