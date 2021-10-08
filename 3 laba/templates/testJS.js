
const Demo1 = {
  data() {
    return {
      show: true,
    };
  }
};
  

const Demo2 = {
  data() {
    return {
      show: true 
  };

  }
};


Vue.createApp(Demo1).mount('#demo1');
  
Vue.createApp(Demo2).mount('#demo2');

