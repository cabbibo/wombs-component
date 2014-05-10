  function Component(){
  
  }

  Component.prototype._init = function(){

    this.active       = false;

    this._startArray   = [];
    this._endArray     = [];
    this._updateArray  = [];

    this.components   = [];

    this.init();


  }

  Component.prototype.init = function(){}

  Component.prototype.onAdd = function(){}
 
  Component.prototype.addComponent = function( component ){

    component.parent = this;
    component.siblings = this.components;
    
    // Makes sure everyone knows about the newborn
    this.updateSiblings();
    

    //TODO: Update all siblinings every time a component is added

    component.onAdd();

    this.components.push( component );

  }



  Component.prototype.removeComponent = function( component ){

    component.onRemove();
    for( var i = 0; i < this.components.length; i++ ){

      if( this.components[i] === component ){

        this.components.splice( i , 1 );
        i --;

      }

    }

  }

  Component.prototype.onRemove = function(){}



  /*
    
     START:

     Sets to active, 
     Calls start on all components,
     And calls all functions in start array
     
  */
  Component.prototype._start = function(){
   
    this.active = true;
    
    for( var i = 0;  i < this.components.length; i++ ){
      this.components[i]._start();
    }

    for( var i = 0; i < this._startArray.length; i++ ){
      this._startArray[i]();
    }
   
  }

  Component.prototype.addToStartArray = function( callback ){
    this._startArray.push( callback.bind( this ) );
  }

  Component.prototype.removeFromStartArray = function( callback ){

    for( var i=0; i < this_startArray.length; i++ ){

      if( this._startArray[i] == callback ){
        this._startArray.splice( i , 1 );
        break;
      }

    }
 
  }
  
 
   /*

    Update

     Calls start on all components,
     And calls all functions in start array
     
  */
  Component.prototype._update = function(){
    
    if( this.active ){
    
      for(var i = 0;  i < this.components.length; i++ ){
        this.components[i]._update();
      }
      
      for( var i = 0; i < this._updateArray.length; i++ ){
        this._updateArray[i]();
      }

    }
    

  }


  Component.prototype.addToUpdateArray = function( callback ){
    this._updateArray.push( callback.bind( this ) );
  }
 

  /*
  
     End
     Set active to false, 
     and percolate down the false array

  */
  Component.prototype._end = function(){
    
    this.active = false;
    
    for( var i = 0;  i < this.components.length; i++ ){
      this.components[i]._end();
    }

    for( var i = 0; i < this._endArray.length; i++ ){
      this._endArray[i]();
    }
  
  }

  Component.prototype.end = function(){};

  Component.prototype.addToEndArray = function( callback ){
    this._endArray.push( callback.bind( this ) );
  }
  


  /*
   
     Extra Functions

  */

  Component.prototype.updateSiblings = function(){

    for(var i = 0; i < this.components.length; i++ ){

      this.components[i].siblings = this.components[i];

    }

  }


  module.exports = Component;

