Beside viewing of refinable functions as a practical utility of promoting modularity. Refinable functions also try to tackle scientific research problem around the field of programming languages and software engineering in computer science. 

## Publications

[Implementing Language-based Modularity using Object-oriented Refinement of Function](https://hiun.org/pubs/refinable.pdf)  
Hiun Kim. Individual Research Technical Report. Working Draft. December 2017.

[Object-orientation for Behavior Modeling and Composition](https://hiun.org/pubs/oo.pdf)  
Hiun Kim. Proceedings of Korea Conference on Software Engineering(KCSE). February 2017.

### Abstract
Due to the rising use of script languages, adapting advanced modularity techniques is important for achieving scalable engineering using script languages. The language-based technique like Aspect-oriented Programming is important since it implements modularity directly at the level of source code using language primitives. However, many existing modularity implementations are based on compiler extensions which are hard to applicable for script languages because it operates on identical compile and execution environment that is depended on clients. To implementing modularity in arbitrary runtimes, This paper introduces language feature <i>Refinable Functions</i>, class-based function which gradually reuses commonalities and localizes variabilities of software to implement behavioral and structural abstraction of modularity by inheritance and refinement of function, as a result refinable functions enables to refine/inherit/subtype function similarly how we refine/inherit/subtype of classes. refinable functions are purely based on OO feature which does not require runtime constraint but succeeds primitive syntactic support from OOP. We make applications of Refinable Functions to shows 1)efficiency of using refinable functions as a modularity technique for code reuse and localization, 2)a formal model of refinable function with JavaScript implementation and discussions on language and performance issues. This paper shows the application of OO concept as an optimal medium of a pragmatic language-based modularity method.
## Research of Functions Refinement

This chapter discusses function refinement as research topics.

### Programming Languages

Verification is important issues of making a complex language without interrupting its compositional and operational correctness. Semantics definition and type system is a central mechanism to codify and implement verification of arbitrary use of programming languages syntax fragment. In Refinable function, a major operation is formalized as operational semantics and leverages concept like function subtyping to ensure refinement correctness.

### Software Engineering

Among many of its feature, the design and implementation aspect of refinable functions is exposed as a contribution to solving practical language and runtime dependency of using such modularity mechanism. Refinable function shows correspondence for aspect and feature-oriented programming to substantiate its connection to many lasting previous modularity techniques as well as introduces novel programmatical approach function refinement such as leveraging builder and factory design pattern just like constructing, refining 

## Applications of Function Refinement

This chapter discusses applications of function refinement in the context of programming languages theory and software engineering values.

### Refinable Functions for Object-oriented Design

Refinable functions could be used for refinable methods for class-level augmentation support in composition method of aspect-oriented programming.

### Thinking in Modularity

When we look function modularity in the context of function, there are many applications are enabled. In modern applications, most of modularizations techniques are held in the level of object-oriented design; the reuse and localization of common and variant part are major issues of feature-oriented programming and software product line community. However most of the existing research require to use special compilers or preprocessors, tools to make this separation of concern seamlessly to existing code. By using object-oriented programming refinable functions leverages existing native syntax and semantics functionalities of many native object-oriented programming languages without modifying its underlying systems.

### Commonality Reuse of Refinable Functions
<img src="./static/img/reuse.png" alt="Reuse of Common Functions">
The figure shows reuse of common subfunctions for making web API. The commonalities are gradually localized by each parental function and variabilities are gradually localized by its child functions. Three refinements and two inheritance make abstract `RefinableAPI` into `ReadIO` and `WriteIO` which localize operation specific concern for reading and write operation. The two inherited functions again specified into `ReadText`, `ReadImage`, `WriteText`, `WriteImage`, by localizing respective concerns. Finally, four refined functions will be composed into a method of a class for `OperationMgr`, `FeatureMgr`.


### Variability Localization of Refinable Functions
<center>
  <img src="./static/img/localization.png" alt="Localization of Variant Functions" style="width: 35%">
</center>
The figure shows more sophisticated example of function refinement as previous example. The example leverages `HTMLViewer` to localize variabilioties caused by making `PlainCrawler` and `SSLCrawler` via extension and mutation of `HTMLViewer`. 