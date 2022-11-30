# react-trello 🧙🏻‍♂️

22.10.12~22.10.14

wth nomadcoder

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></a>

## Function

✨ 보드 내 사람 추가,삭제 가능

✨ 새로운 보드 추가 가능

✨ 보드 삭제 가능

✨ 같은/다른 보드 내에서 이동 가능

## ScreenShot

<img src="https://github.com/aubepluieh3/react-trello/blob/c3366db537314c3a6e6f8bf268d3213be14e8227/Screenshot/%EA%B8%B0%EB%B3%B8.JPG" width="500px" hegiht="300px"/>

<img src="https://github.com/aubepluieh3/react-trello/blob/c3366db537314c3a6e6f8bf268d3213be14e8227/Screenshot/Add%20person.JPG" width="500px" height="300px"/>

<img src="https://github.com/aubepluieh3/react-trello/blob/c3366db537314c3a6e6f8bf268d3213be14e8227/Screenshot/%EC%B6%94%EA%B0%80.JPG" width="500px" height="300px"/>

<img src="https://github.com/aubepluieh3/react-trello/blob/c3366db537314c3a6e6f8bf268d3213be14e8227/Screenshot/change.JPG" width="500px" height="300px"/>

<img src="https://github.com/aubepluieh3/react-trello/blob/c3366db537314c3a6e6f8bf268d3213be14e8227/Screenshot/%EB%8B%A4%EB%A5%B8%20%EB%B3%B4%EB%93%9C%EB%A1%9C.JPG" width="500px" height="300px"/>

## Study

drag-and-drop context는 기본적으로 드래그 앤 드롭을 가능하게 하고 싶은 앱의 한 부분

onDragEnd라는 함수는 유저가 드래그를 끝낸 시점에 불려지는 함수
그럼 여기에 onDragEnd를 두고, onDragEnd라는 함수를 만들어

DragDropContext는 children이라는게 필요로함

Children은 그냥 여기 있는 요소 중 하나

```
const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div></div>
    </DragDropContext>
  );
```

Droppable은 droppableld라고 불리는 prop을 필요로 함 그리고 children을 필요로함
근데 droppable의 children은 함수여야함

```
<Droppable droppableId="one">{() => <ul></ul>}</Droppable>
```

이렇게 해야하는 이유는 Droppable안에 component를 넣으면 바로 사용할 수 있는 무언가를 얻음

```
<Draggable draggableId="first" index={0}>
                {() => <li>One</li>}
              </Draggable>
```


draggableprovided에서 draggbleProps는 전체화면을 드래그,, dragHandleProps는 원하는 곳만 드래그에서 옮기고 싶을때,,

```
{(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>🔥</span>
                    One
                  </li>
                )}
```

✨ style

Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용

Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지

Draggable 노드의 형제로 렌더링하는 것이 좋음

Recording

atom의 값을 가져오고 싶으면 useRecoilValue 사용하면 됨
근데 atom의 값  뿐만 아니라 atom을 수정하는 함수까지 부르고 싶다면 useRecoilState를 써야함

onDragEnd; 함수 드래그가 끝났을 때 실행되는 함수

onDragEnd는 어떤 일이 일어났는지에 대한 정보로 많은 argument를 준다는거임
```
const onDragEnd =(args:any)=>{console.log(args)};
```
드래그 앤 드롭을 할 때마다 그게 어디서 왔고 어디로 가는지 알려줌
```
const onDragEnd = ({ destination, source }: DropResult) => {};
```

splice(start,deletecount, ...items )
ex)x.splice(0,1) splice는 index 0으로 가서 1개의 item을 삭제할거임
ex)x.splice(3,0,"a"); index 3에서 시작해서 아무것도 지우지 않고 a를 집어넣음


```
setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
 // 1) Delete item on source.index
toDosCopy.splice(source.index, 1);
// 2) Put back the item on the destination.index
toDosCopy.splice(destination?.index, 0, draggableId);
return toDosCopy;
    });
```

우리 예전의 oldToDos를 복사해서 source.index에 있는 item을 삭제하고(움직이고 있는 item을 삭제하고) 그 item을 다시 item이 도착한 지점에 넣어주기

```
 const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      // 1) Delete item on source.index
      console.log("Delete item on", source.index);
      console.log(toDosCopy);
      toDosCopy.splice(source.index, 1);
      console.log("Deleted item");
      console.log(toDosCopy);
      // 2) Put back the item on the destination.index
      console.log("Put back", draggableId, "on ", destination.index);
      toDosCopy.splice(destination?.index, 0, draggableId);
      console.log(toDosCopy);
      return toDosCopy;
    });
  };
```


```
<Draggable key={toDo} draggableId={toDo} index={index}>
```
< Draggable /> list의 키
< Draggable /> list를 렌더링하는 경우 각 < Draggable />에 key prop을 추가

key랑 draggableId가 무조권 같아야함
key는 list 내에서 고유해야하고, key에 item의 index가 포함되어서는 안 됩니다. (map의 index사용 X) 일반적으로 draggableId를 key로 사용하면 됨.
주의! list에 key가 없으면 React가 경고하지만 index를 key로 사용하는 경우 경고하지 않음

```
return items.map((item, index) => (
< Draggable
// adding a key is important!
key={item.id}
draggableId={item.id}
index={index}
>
```

✨ Performance

지금 문제점: react.js에서 component의 State가 변하면 해당 component의 모든 children은 다시 렌더링 돼

a는 바뀌지않고 e랑 f만 바뀌었는데도! rendering 됨!

왤까? Droppable,Board, DrapDropContext등 부모 State가 바뀌면 우리의 Card는 다시 렌더링 될거임
state가 바뀌면 모든게 change됨!

```
export default React.memo(DragabbleCard);
```
react memo는 react.js한테 prop이 바뀌지 않는다면 컴포넌트(여기선 DragabbleCard)를 렌더링 하지 말라고 함

component들의 prop이 바뀌었으면 걔네만 그 item들만 다시 rendering 되는것


✨ Multi Boards

```
interface IToDoState{
[key: string]: string[];
}
```

이 state는 string으로써의 property와 string array로 이루어져있다고

Object.keys(obj)

Object.keys() 메소드는 주어진 객체의 속성 이름들을 일반적인 반복문과 동일한 순서로 순회되는 열거할 수 있는 배열로 반환
ex) Object.keys(obj).map((item)=>obj[item])
```
const object1 = {
a: 'somestring',
b: 42,
c: false
};
console.log(Object.keys(object1)); // Array ["a", "b", "c"]
```

✨ Same Board Movement

```
setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [(source.droppableId)]: boardCopy,
        };
      });
```

여기서 우리가 하는 건 복사하는거
예를 들어, doing board를 복사해서, 그 복사본을 대체하고 변형하고, 다른 board들을 모두 return하면서 이제 doing은 board의 복사본이라고 말해주는거!


✨ Droppable Snapshot 

isDraggingOver은 snapshot에서 나옴

isDraggingOver: boolean
현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인

draggingOverWith: ?DraggableId
Droppable 위로 드래그하는 Draggable ID

draggingFromThisWith: ?DraggableId
현재 Droppable에서 _벗어난_ 드래깅되고 있는 Draggable ID

isUsingPlaceholder: boolean


✨ Refs

references: 우리의 react 코드를 이용해 HTML 요소를 지정하고, 가져올 수 있는 방법
다시 말해 자바스크립트로부터 HTML 요소를 가져오고 수정하는 방법

```
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} placeholder="grab me" />
```

✨ Creating Tasks


아래쪽으로 생성

```
return {
        ...allBoards,
        [boardId]: [...allBoards[boardId],newToDo],
      };
```

맨위로 생성

```
return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
```

✨ localstorage

npm i recoil-persist

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

 effects_UNSTABLE: [persistAtom],
