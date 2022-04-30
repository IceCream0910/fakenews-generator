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

function uploadArticle() {
    var title = $('#title').val();
    var author = $('#author').val();
    var summary = $('#summary').val();
    var content = $('#content').val();

    if (title && author && summary && content) {
        console.log(title, author, summary, content)
        var data = {
            title: title,
            author: author,
            summary: summary,
            content: content,
            createdAt: moment().format('YYYY.MM.DD a hh:mm'),
        }
        db.collection('articles').add(data).then((result) => {
            console.log(result._key.path.segments[1]);
            //$('#article-url').val('article.html?id=' + result._key.path.segments[1]);
            $('#article-url').val('https://news-naver.vercel.app/article.html?id=' + result._key.path.segments[1]);
            $('#main-wrap').hide();
            $('#complete-wrap').css({ 'display': 'flex' });
        }).catch((err) => {
            console.log(err);
        });
    } else {
        toast('모든 항목을 입력해주세요.');

    }


}

function restart() {
    location.reload();
}

function openArticle() {
    window.open($('#article-url').val(), '_blank');
}