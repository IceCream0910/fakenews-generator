const firebaseConfig = {
    apiKey: "AIzaSyCDyiLD6qgc_kejwwfyQaxCw0hkV151jFQ",
    authDomain: "newsmaker-800f5.firebaseapp.com",
    projectId: "newsmaker-800f5",
    storageBucket: "newsmaker-800f5.appspot.com",
    messagingSenderId: "466746329729",
    appId: "1:466746329729:web:2cee37188c9cef83d3db80",
    measurementId: "G-Y3M8HW1MZ9"
  };
  

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function toast(msg) {
        Toastify({
            text: msg,
            duration: 2200,
            newWindow: true,
            close: false,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              boxShadow: "none"
    
            }
          }).showToast();
}



// url 에서 parameter 추출
function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

var articleRef = db.collection('articles').doc(getParam('id')).get();

articleRef.then(function(doc) {
    if (doc.data()) {
        console.log(doc.data());
        $('#custom_title').html(doc.data().title);
        $('#custom_date').html(doc.data().createdAt);
        $('#custom_content').html(doc.data().content);
        $('#custom_author').html(doc.data().author);
        $('#custom_author-2').html(doc.data().author);
        $('#custom_author-3').html(doc.data().author);
        $('#custom_summary').html(doc.data().summary);

    } else {
        alert('존재하지 않는 기사입니다.');
        history.back();
    }
});