// var m1 = require('../../src/components/homeworkCenter/knowledge.vue');
// //console.log.log(m1)
var options = {
  container: 'jsmind_container',
  editable: true,
  theme: 'primary'
}
var indexidx = 0;
var topicname = "";
var mind = {
  meta: {
    name: 'demo',
    author: 'hizzgdev@163.com',
    version: '0.2'
  },
  format: 'node_array',
  data: []
};
var jm
var valuesa = 1,chapterid="";

queryTestBookDetail()

function update(canshujuti, values,topic,chapterId) {
    //console.log.log(chapterId)
  indexidx = canshujuti;
  chapterid=chapterId;
  topicname = topic;
  mind.data = [];
  valuesa = values;
  $('.jsmind-inner').remove();
  queryTestBookDetail()
  // //console.log.log(canshujuti,valuesa,"canshujuti")


}
// //console.log.log(chapterId)
$(document.body).on('click', '.all-btn', function(e) {
    $('.jsmind-inner').remove();
    mind.data = [];
   
        jm = jsMind.show(options, mind),
          root = jm.get_root();
})

function queryTestBookDetail() {
  $.ajax({
    type: "POST",
    url: "http://api.ikeshen.com/likework/queryTestBookDetail.do",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: {
      gradeId: valuesa
    },
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization",
        window.sessionStorage.getItem('token'))
    },
    success: function(data) {
      mind.data = [];
      // //console.log.log(data.data); 

      // for(var i=0;i<data.data.length;i++){
      var j = indexidx
      //console.log.log(j,"j")
      if(j!=-1){


          if (data.data[j].label) {
            mind.data.push({ id: 'root', 'isroot': true, topic: data.data[j].label,idx:data.data[j].id,flag:1,list:[]})
          let aaa = setleafCountTree(data.data[j],mind.data);
          //console.log.log(aaa)
          return false;
            if (data.data[j].list) {
              for (let i = 0; i < data.data[j].list.length; i++) {
                mind.data.push({ id: 'sub' + (i + 1), sid:data.data[j].list[i].id,'parentid': 'root', topic: data.data[j].list[i].label,idx:data.data[j].list[i].id,flag:1 })
                if (data.data[j].list[i].list) {
                  for (var k = 0; k < data.data[j].list.length; k++) {
                    if (data.data[j].list[i].list[k] != undefined) {
                      mind.data.push({ id: 'sub' + (i + 1)+'-' + (k + 1),sid:data.data[j].list[i].list[k].id, 'parentid': 'sub' + (i + 1), topic: data.data[j].list[i].list[k].label,idx:data.data[j].list[i].list[k].id,flag:1 })

                    }

                  }

                }
              }

            }
          }
      }
      else{
          mind.data.push({id:'root','isroot':true,topic:topicname});
          data.list = data.data;
            mind.data = setleafCountTree(data,mind.data);
          // console.log.log(bbb)
          // return false;
          // if(data.data){
          //     for(let i = 0;i<data.data.length;i++){
          //         mind.data.push({id:'sub'+(i+1),'parentid':'root',topic:data.data[i].label,idx:data.data[i].id,flag:1})
          //         if(data.data[i].list){
          //             for(let j=0;j<data.data[i].list.length;j++){
          //                 mind.data.push({id:'sub'+(i+1)+'-'+(j+1),'parentid':'sub'+(i+1),topic:data.data[i].list[j].label,idx:data.data[i].list[j].id,flag:2})
          //                 if(data.data[i].list[j].list){
          //                   for (var k = 0; k < data.data[i].list[j].list.length; k++) {
          //                       if (data.data[i].list[j].list[k] != undefined) {
          //                         mind.data.push({ id: 'sub' + (i + 1)+'-' + (j+1)+'-' + (k + 1), 'parentid': 'sub' + (i + 1)+'-'+(j+1), topic: data.data[i].list[j].list[k].label,idx:data.data[i].list[j].list[k].id,flag:3 })
          //                       }
          //                     }
          //                 }
          //             }
          //         }
          //     }
          // }
      }
      // }
     // console.log(mind.data)
     $('.jsmind-inner').remove();
      jm = jsMind.show(options, mind),
        root = jm.get_root();

    },
    error: function(error) {
      //console.log.log(error);
    }
  });
}
let newdata = [];
$(document).on('click','.submit',function(){
    // //console.log.log(parent)
    // //console.log.log(parent.m1)
    // parent.alerts();
    parent.teacher();
    // return false;
    // //console.log.log()
    let data = jm.mind.root;
    //console.log.log(data);
    // //console.log.log(JSON.stringify(data));
    newdata={gradeid:valuesa,label:data.topic,chapterId:chapterid,list:[]}

    let aaa=getLeafCountTree(data,newdata)
    //console.log.log(JSON.stringify(aaa));
        $.ajax({
        type:'post',
        url:'http://api.ikeshen.com/likework/updateTestBookSetup.do',
        data:{
            flag:indexidx==-1?1:2,
            date:JSON.stringify(aaa)
        },
        headers:{
            "Authorization":window.sessionStorage.getItem('token')
        },
        success:res=>{
            //console.log.log(res)
        }
    })
    //flag   1 总纲 2 分支
    return false
    newdata={gradeid:valuesa,label:data.topic,chapterId:chapterid,list:[]}
    data.children.forEach((item,index)=>{
        newdata.list.push({id:item.id,label:item.topic,list:[]})
        item.children.forEach((items,indexs)=>{
            newdata.list[index].list.push({id:items.id,label:items.topic,list:[]})
            if(items.children){
                items.children.forEach((val,i)=>{
                    newdata.list[index].list[indexs].list.push({id:val.id,label:val.topic})
                })
            }
        })
    })
})

// 解译tree数据
function getLeafCountTree(json,data) {
  if(!json.children){
      return 1;
  }else{
      var leafCount = 0;
      for(var i = 0 ; i < json.children.length ; i++){
          data.list.push({id:json.children[i].id,label:json.children[i].topic,list:[]})
          getLeafCountTree(json.children[i],data.list[i]);
      }
      return data;
  }
}

// 生成tree数据
function setleafCountTree(json,data,parentid){
    // //console.log.log(json)
    //console.log.log(parentid)
    if(!json.list){
        return 1;
    }
    else{
        for(var i=0;i<json.list.length;i++){
            data.push({id:parentid?parentid+'_'+(i+1):'sub'+(i+1),'parentid':parentid?parentid:'root',topic:json.list[i].label,idx:json.list[i].id,flag:1})
            //console.log.log(data[i])
            setleafCountTree(json.list[i],data,data[i+1].id)
        }
        return data;
    }
}

$(document).on('click','.add',function(){
    let data = mind.data;

})

var initialHeight = $('.theme-primary').height();
// $('.root').css('left', '10px')
// var list = [root];
function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  var $e = $(e.target),
    _text = $e.text();
  if (_text && _text != '') {
    e.dataTransfer.setData("Text", _text);
  }
}

function end(e) {
  var $e = $(e.target);
  if (jm.get_node($e.text())) {
    $e.remove();
  } else {
    alert('请移动到目标节点区域')
  }
}

function getAllNodes(node, arr) {
  if (!node.children.length) {
    return arr;
  } else {
    $.each(node.children, function(index, val) {
      arr.push(val);
      getAllNodes(val, arr);
    })
  }
  return arr;
}

function drop(e) {
  e.preventDefault();
  var name = e.dataTransfer.getData("Text");
  var x = e.pageX,
    y = e.pageY,
    list = [root];
  var all_nodes = getAllNodes(root, list);
  if (all_nodes.length == 1) {
    addNode(name);
  } else {
    $.each(all_nodes, function(index, val) {
      var $e = $(val._data.view.element);
      var offsetX1 = $e.offset().left;
      var offsetX2 = $e.offset().left + $e.outerWidth();
      var offsetY1 = $e.offset().top;
      var offsetY2 = $e.offset().top + $e.outerHeight();
      if (offsetX1 < x && x < offsetX2 && offsetY1 < y && y < offsetY2) {
        jm.add_node(val, name, name)
        checkZoomout();
      }
    })
  }
  // if (name) {
  //     addNode(name);
  // }
}

function isExist(name) {
  var _exist = false,
    reg = new RegExp('^' + name + '$', "g")
  $('.tag').each(function(index, val) {
    if (!!$(val).text().match(reg)) {
      _exist = true;
    }
  });
  return _exist;
}

function createNode(name) {
  if (isExist(name) || jm.get_node(name)) {
    alert('节点已存在');
    return;
  } else {
    var html = '<button class="btn btn-default tag" draggable="true" ondragstart="drag(event)" ondragend="end(event)">' + name + '</button>';
    $('.nodes').append(html);
    // $('.child-nodes').show();
  }
}

function addNode(name) {
  var _node = jm.get_selected_node(); // as parent of new node
  if (!_node) {
    _node = jm.get_root();
  }
  jm.add_node(_node, name, name);
}

function checkZoomout() {
  if ($('.theme-primary').height() > initialHeight) {
    jm.view.zoomOut();
    initialHeight = $('.theme-primary').height()
  }
}

function checkZoomin() {
  if ($('.theme-primary').height() < initialHeight) {
    jm.view.zoomIn();
    initialHeight = $('.theme-primary').height()
  }
}

function createExtraHtml(el) {
  //console.log.log(el);
  // return ''
}

$(document.body).on('click', '.add-node', function(e) {
  $('.nodes > button').removeClass('node');
  var node_name = prompt('请输入节点名');
  if (node_name) {
    createNode(node_name);
  }
});

$(document.body).on('click', '.del-node', function(e) {
  var _node = jm.get_selected_node();
  if (!_node) {
    alert('请选择一个节点')
  } else if (_node == jm.get_root()) {
    alert('不能删除根节点')
  } else {
    jm.remove_node(_node);
    checkZoomin()
  }
})

$(document.body).on('click', '.upload-btn', function(e) {
  var _node = jm.get_selected_node();
  if (!_node) {
    alert('请选择一个节点')
  } else {
    // jm.remove_node(_node);
  }
})

$(document.body).on('click', '.fa-search-plus', function(e) {
  jm.view.zoomIn();
})

$(document.body).on('click', '.fa-search-minus', function(e) {
  jm.view.zoomOut();
})
// $.contextMenu({
//     selector: 'jmnode',
//     callback: function(key, options) {
//         var m = "clicked: " + key;
//         alert(m);
//     },
//     items: {
//         "upload": {
//             name: "上传文件",
//             icon: "fa-image"
//         },
//
//     }
// });

bindExtrasEvent($('.extras'));
//使用背景按钮删除
// $(document.body).on('click', '.del-node', function() {
//     $('.nodes > button').toggleClass('node');
// });
//
// $(document.body).on('click', '.node', function(e) {
//     var $e = $(e.target), name = $e.text();
//     $e.remove();
//     if (jm.get_node(name)) {
//         jm.remove_node(name);
//     }
//     if ($('.nodes').children().length == 0) {
//         $('.child-nodes').hide();
//     }
// })
