<template>
  <div>
    <div style="background-color: #ffbd8e; width: 100%; padding:16px">
      <h2 :style="{display: 'flex', 'justify-content': 'center', color: '#2d105f', 'font-size': mobile ? '2.5rem' : '4rem'}">
        About</h2>
    </div>
    <div :style="{padding: mobile ? '32px 16px' : '32px 64px'}">


      <b style="font-size: 1.5rem">Contact</b>
      <div style="margin-top: 16px; margin-bottom: 32px">
        <div>
          <v-btn icon><a style="text-decoration: none" :href="'mailto:'+getSSMail()">
            <v-icon>mdi-email-edit</v-icon>
          </a></v-btn>
          sepideh.sadegh(_at-]uni-hamburg.de
        </div>
        <div>
          <v-btn icon><a style="text-decoration: none" :href="'mailto:'+getDBMail()">
            <v-icon>mdi-email-edit</v-icon>
          </a></v-btn>
          david.b.blumenthal(_at-]fau.de
        </div>
      </div>
      <b style="font-size: 1.5rem">Cite</b>
      <div style="margin-top: 16px; margin-bottom: 64px; text-align: justify">
        <div style="margin: 16px 64px">Sepideh Sadegh, James Skelton, Elisa Anastasi, Andreas Maier, Klaudia Adamowicz, Anna Möller, Nils M. Kriege, Jaanika Kronberg, Toomas Haller, Tim Kacprowski, Anil Wipat, Jan Baumbach & David B. Blumenthal, Lacking mechanistic disease definitions and corresponding association data hamper progress in network medicine and beyond. <i>Nature Communications</i> <b>14</b>, 1662 (2023).
          <a href="https://doi.org/10.1038/s41467-023-37349-4">https://doi.org/10.1038/s41467-023-37349-4</a>
        </div>
      </div>
      <b style="justify-content: center; display: flex;font-size: 1.25rem; color: #484848">Impressum</b>
      <div style="height: .85rem"></div>
      <span style="justify-content: center; display: flex; font-size: .85rem">Prof. Dr. Jan Baumbach</span>
      <span
          style="justify-content: center; display: flex; font-size: .85rem">Chair of Computational Systems Biology</span>
      <div style="height: .85rem"></div>
      <span style="justify-content: center; display: flex; font-size: .85rem">Phone: +49-40-42838-7313</span>
      <span style="justify-content: center; display: flex; font-size: .85rem">E-Mail: <a :href="'mailto:'+getMail()">cosy[at)zbh.uni-hamburg.de</a></span>
      <span style="justify-content: center; display: flex; font-size: .85rem">Address: Prof. Dr. Jan Baumbach</span>
      <span style="justify-content: center; display: flex; font-size: .85rem">University of Hamburg</span>
      <span style="justify-content: center; display: flex; font-size: .85rem">Notkestraße 9</span>
      <span style="justify-content: center; display: flex; font-size: .85rem">22607 Hamburg</span>
      <span style="justify-content: center; display: flex; font-size: .85rem">Germany</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      mobile: this.isMobile()
    }
  },
  methods: {
    isMobile: function () {
      let check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    getMail: function () {
      let mail = "zbh.uni-hamburg.de"
      mail = "cosy" + mail
      mail = mail.split("z").join("b@z")
      return mail
    },
    getSSMail: function () {
      let mail = "-hamburg.de"
      mail = "sepideh.sadegh" + mail
      mail = mail.split("gh").join("gh@uni")
      return mail
    },
    getDBMail: function () {
      let mail = "fau.de"
      mail = "david.b.blument" + mail
      mail = mail.split("f").join("hal@f")
      return mail
    }
  }

}
</script>

<style scoped>

</style>
