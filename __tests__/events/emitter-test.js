import "js_pro_src/events/emitter"
import emitter from "js_pro_src/events/emitter";

it('events/emitter 测试', function () {
  const Aaa = "Aaa"
  let aaa1 = emitter.on(Aaa, () => {
    console.log("aaa1")
  })
  emitter.on(Aaa, () => {
    console.log("aaa2")
  })

  console.log(emitter.__get(Aaa))

  emitter.emit(Aaa)

  emitter.remove(aaa1)

  console.log(emitter.__get(Aaa))

  emitter.emit(Aaa)

  console.log(emitter.__get(Aaa))
})
