const mongs = require('mongoose');
const scheme = mongs.Schema;

const blogScheme = new scheme({
 
   title:{
      type:String,
      require:true
   },
   short:{
      type:String,
      require:true
   },
   long:{
      type:String,
      require:true
   }
},{timestamps:true});

const Blog = mongs.model('Blog',blogScheme);
module.exports = Blog;

