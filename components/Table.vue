<template>
<div id="flip-list-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <table>
    <transition-group name="flip-list" tag="ul">
        <tr v-for="item in candidatesTable" :key="item.rank" class="table-row-item">
            <td>{{ item.rank }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.pVotes }}</td>
            <td>{{ item.voters }}</td>
            <td>{{ item.seal }}</td>
        </tr>
    </transition-group>
  </table>
</div>

</template>

<style scoped lang="less">
body {
  padding: 15px;
}

hr {
  margin: 15px 0;
}

.table-row-move {
  transition: all .5s;
}

.table-row-item {
  backface-visibility: hidden;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

<script>
import _ from 'lodash'
  export default {
    // el: '#demo',
    data() {
        return {
            items: [
                { id: 1, name: 'Vue' },
                { id: 2, name: 'React' },
                { id: 3, name: 'Angular' },
                { id: 4, name: 'Ember' },
            ],
            candidatesTable:[],
            total: 25,
            currentPage: 1,
            pageSize: 25,
          }
      },
    methods: {
        shuffle() {
            this.candidatesTable[0].voters ++;
            // this.candidatesTable = _.shuffle(this.candidatesTable)
            this.candidatesTable[2].voters ++;
            this.candidatesTable[3].seal += 10;
        },

        showData() {
            this.$axios.$get("/votes/candidatesStatus?page_size=" + this.pageSize + "&page_number=1").then(res => {
                console.log(res)
                let i = 1;
                for( let r of res ) {
                    let candidate = {};
                    candidate.rank = i;
                    candidate.address = r.address;
                    candidate.name = r.address.toString().substr(0,20) + '...';
                    candidate.pVotes = r.pVotes + "%";
                    candidate.voters = parseInt(r.voters).toLocaleString('en-US');
                    candidate.seal = parseInt(r.seal).toLocaleString('en-US');
                    this.candidatesTable.push(candidate)
                    i++;
                }
            })
        }


    },
    mounted() {
        this.showData();
    },
  }
</script>