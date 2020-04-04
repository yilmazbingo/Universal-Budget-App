### Subscribe and subsubscribe

          const database=database.ref()
          const onValueChange=database.ref().on('value',(snapshot)=>console.log(snapshot.val()),
                                                        (e)=>console.log(e))

          database.ref().off(onValueChange) //Detaches a callback previously attached with on().
