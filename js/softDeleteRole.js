function SoftDeleteRole(){
    Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to see this role!",
        icon: "warning",
        cancelButtonColor: '#c7c6c5',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes',
        showCancelButton: true,

      })
      .then((result) => {
        if (result.isConfirmed) {
            var url = "../db/SoftDeleteRole.php"
            axios.get(url).
            then(response => {
                console.log(response.data)
                Swal.fire("Success! Role has been soft deleted.", {
                icon: "success",
                });
            })
            .catch(error => {
                console.log(error.message)
            })
        } else {
            Swal.fire("Role has not been soft deleted!");
        }
      });
          
    }