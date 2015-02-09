import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bootstrap-datepicker', 'bootstrap-datepicker component');

test('should be an input tag', function() {
  expect(1);

  equal('INPUT', this.$().prop('tagName'));
});

test('should display empty input field when no date is set', function(){
  expect(1);

  var component = this.subject({
    value: null
  });

  equal(this.$().val(), '');
});


test('should display date with default format when no format is set', function(){
  expect(1);

  var component = this.subject({
    value: '2014-12-31T00:00:00.000Z'
  });

  equal(this.$().val(), '12/31/2014');
});

test('should display date with custom format when format is set', function(){
  expect(1);

  var component = this.subject({
    value: '2014-12-31T00:00:00.000Z',
    format: 'dd.M.yy'
  });

  equal(this.$().val(), '31.Dec.14');
});

test('should set dates provided by value (multidate, default multidateSeparator)', function(){
  expect(2);
  
  var component = this.subject({
    value: '2015-01-13T00:00:00.000Z,2015-01-07T00:00:00.000Z,2015-01-15T00:00:00.000Z',
    multidate: true
  });

  equal(this.$().val(), '01/13/2015,01/07/2015,01/15/2015', 'should set value as input field value');
  equal(this.$().datepicker('getDates').length, 3, 'should set internal datepicker dates by value');
});

test('should set dates provided by value (multidate, multidateSeparator provided)', function(){
  expect(2);

  var component = this.subject({
    value: '2015-01-13T00:00:00.000Z;2015-01-07T00:00:00.000Z;2015-01-15T00:00:00.000Z',
    multidate: true,
    multidateSeparator: ';'
  });

  equal(this.$().val(), '01/13/2015;01/07/2015;01/15/2015', 'should set value as input field value using multidate separator');
  equal(this.$().datepicker('getDates').length, 3, 'should set internal datepicker dates by value');
});

test('should use forceDateValue to set value as JS Date objects instead of ISOString', function(){
  expect(1);

  var date = new Date();
  var newDate = new Date("2015-02-10");

  var component = this.subject({
    value: date,
    multidate: false,
	forceDateValue: true
  });

  component.set('value', newDate);

  equal(component.get('value'), newDate, "Value should be the date object set");
});
