document.getElementById('signUp').onclick = ()=>{
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password1 = document.getElementById('password1').value;
    var password2 = document.getElementById('password2').value;
    var role = document.getElementById('role').value;
    
    document.getElementById('section').style.display = 'none';
    document.getElementById('loader').style.display = 'block';
    

    // signup logic
    if(password1 ==  password2){
      firebase.auth().createUserWithEmailAndPassword(email, password1)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;

    firebase.firestore().collection("users").add({
      Name: name,
      Email: email,
      Password: password1,
      UserId: user.uid,
      Role: role
  })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      })
      .then(()=>{
        firebase.firestore().collection("users").where("UserId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var userType = doc.data().Role;
            console.log(userType);
            if(userType == 'admin'){
              window.location.href="/admin.html";
            }else if (userType == 'accountant'){
              window.location.href = "/accountant.html";
            }else{
              window.location.href = "/index.html";
            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
      })
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
    }else{
      window.alert('please enter matching passwords');
      document.getElementById('section').style.display = 'block';
      document.getElementById('loader').style.display = 'none';
    }


   

}